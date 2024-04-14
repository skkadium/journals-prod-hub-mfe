import express from 'express'
import { HttpResponse, PathParams, http } from 'msw'
import { createServer } from '@mswjs/http-middleware'
import nJwt, { JSONMap, Jwt } from 'njwt'
import { secret, LoginRequest, LoginResponse, jwtRegEx, userWithoutRole } from './types'
import { logger } from '@repo/logger'

export const log = logger()

const generateJwt = (user: string): string => {
  const claims = {
    iss: 'ppeMockAuthService',
    sub: user,
    alternativeSubject: user,
    scope: 'self, admins',
    roles: [user !== userWithoutRole ? 'ELS-GPO AWS PPE Journal Managers' : 'ELS-GPO AWS PPE Some Other Role'],
    featureToggles: []
  }

  return nJwt.create(claims, secret).compact()
}

const getJwtFromAuthHeader = (req: Request): string => {
  const authorizationHeader = req.headers.get('Authorization')

  const match = jwtRegEx.exec(authorizationHeader ?? '')
  return match && (match[1] || '')
}

const verifyJwt = (token: string, skipResponseBody: boolean) => {
  const verifiedJwt: Jwt = nJwt.verify(token, secret)!
  log.info(`/refresh: 200 - valid mock bearer token "${token}"`)
  if (skipResponseBody) {
    return new HttpResponse(null, { status: 200 })
  }
  const verifiedJwtBody: JSONMap = verifiedJwt.body.toJSON()
  return HttpResponse.json(
    {
      jwt: generateJwt(verifiedJwtBody.sub.toString())
    },
    { status: 200 }
  )
}

const refreshResponseResolver = async ({ request }) => {
  const token = getJwtFromAuthHeader(request) || ''
  try {
    return verifyJwt(token, false)
  } catch (e) {
    log.info(`/refresh: 401 - invalid mock bearer token "${token}"`)
    return HttpResponse.json({ errorType: 'LOGIN_REQUIRED' }, { status: 401 })
  }
}

const logoutResponseResolver = async ({ request }) => {
  const token = getJwtFromAuthHeader(request) || ''
  try {
    return verifyJwt(token, true)
  } catch (e) {
    log.info(e)
    log.info(`/logout: 401 - invalid mock bearer token "${token}"`)
    return HttpResponse.text('Unauthorized', { status: 401 })
  }
}

const handlers = [
  http.post('/refresh', refreshResponseResolver),
  http.post<PathParams, LoginRequest, LoginResponse>('/login', async ({ request }) => {
    const { username, password } = await request.json()
    if (password === 'invalid') {
      log.info(`/login: 401 - invalid password`)
      return HttpResponse.json({ errorType: 'LOGIN_FAILED' }, { status: 401 })
    }
    if (password === 'serverdown') {
      log.info(`/login: 500 - LDAP server not responding`)
      return HttpResponse.json({ errorType: 'LOGIN_FAILED' }, { status: 500 })
    }
    log.info(`/login: 200 - valid credentials "${username}/${password}"`)
    return HttpResponse.json({ jwt: generateJwt(username) }, { status: 200 })
  }),
  http.post('/logout', logoutResponseResolver)
]

const buildApp = (): express.Express => {
  const app = express()

  const server = createServer(...handlers)

  // Apply the mock server as middleware
  app.use(server)

  return app
}

export default buildApp

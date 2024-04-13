import express from 'express'
import { HttpResponse, http } from 'msw'
import { createServer } from '@mswjs/http-middleware'
import fs from 'fs'
import { logger } from '@repo/logger'

export const log = logger()
const buildApp = (mockFileName: string): express.Express => {
  const app = express()
  const mockData = JSON.parse(fs.readFileSync(mockFileName, 'utf8'))

  const server = createServer(
    http.get('/persons', async () => {
      return HttpResponse.json(mockData)
    })
  )
  // Apply the mock server as middleware
  app.use(server)
  return app
}

export default buildApp

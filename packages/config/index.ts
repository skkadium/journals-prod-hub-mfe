export const config = {
  appName: 'journals-production-hub',
  authMock: {
    port: 6000,
    url: 'http://localhost:6000'
  },
  auth: {
    api: {
      path: '/services/ppe-service-authentication'
    },
    interval: 3300000,
    authorisedRoles: [
      'ELS-GPO AWS PPE System Administrators',
      'ELS-GPO AWS PPE Non-Prod System Administrators',
      'ELS-GPO AWS PPE Journal Managers',
      'ELS-GPO AWS PPE Non-Prod Journal Managers'
    ]
  },
  bffMock: {
    port: 5000,
    url: 'http://localhost:5000',
    api: {
      path: '/'
    }
  },
  bff: {
    api: {
      contentType: 'application/json; charset=utf-8',
      path: '/services/ppe-bff-journals-production-hub/graphql'
    }
  },
  findIssueBff: {
    api: {
      contentType: 'application/json; charset=utf-8',
      path: '/services/ppe-service-bff-person'
    }
  },
  webApp: {
    port: 8080,
    path: '/web/ppe-web-journals-production-hub',
    helpUrl: 'https://elsevier.atlassian.net/wiki/spaces/PPECOMMS/overview'
  }
}

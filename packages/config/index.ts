export const config = {
  appName: '${webapp-name}',
  authMock: {
    port: 6000,
    url: 'http://localhost:6000'
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
      path: '/services/ppe-graph-bff-${webapp-name}/graphql'
    }
  },
  personBff: {
    api: {
      contentType: 'application/json; charset=utf-8',
      path: '/services/ppe-service-bff-person'
    }
  },
  pact: {
    brokerUrl: 'https://pact-broker.ppe-np.elsevier.net/',
    consumerVersion: '1.0.0',
    bff: {
      consumerName: 'ppe-web-${webapp-name}',
      providerName: 'ppe-graph-bff-${webapp-name}',
      pactFolder: 'pacts',
      mockProvider: {
        api: {
          path: '/',
          matchers: {
            contentType: '(application\\/json; ?charset=(UTF|utf)-8)'
          }
        },
        log: {
          level: 'INFO',
          filename: 'logs/pact.log'
        },
        port: 8022,
        spec: 2,
        url: 'http://localhost:8022'
      }
    }
  },
  webApp: {
    port: 8080,
    path: '/web/ppe-web-${webapp-name}',
    helpUrl: 'https://elsevier.atlassian.net/wiki/spaces/PPECOMMS/overview'
  }
}

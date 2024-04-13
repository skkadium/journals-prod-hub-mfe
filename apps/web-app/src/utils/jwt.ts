// Secret 'shhhhhhhhh'
export const JOURNAL_MANAGER_JWT_ENC =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJwcGVNb2NrQXV0aFNlcnZpY2UiLCJzdWIiOiJwcGUtdXNlciIsImFsdGVybmF0aXZlU3ViamVjdCI6InBwZS11c2VyIiwicm9sZXMiOlsiRUxTLUdQTyBBV1MgUFBFIEpvdXJuYWwgTWFuYWdlcnMiXSwiZmVhdHVyZVRvZ2dsZXMiOltdLCJqdGkiOiJhYmY5NDU0YS1hYmNjLTQzOTctOTU5MS04ZDA0MWM1NDUzZWIiLCJpYXQiOjE1MzY5MzYxNjQsImV4cCI6NDEwMjQ0NDgwMH0.v1ddvp_uY6cci74eiOo3ib2D2sKpER4_eatT8AFIrek'

export const JOURNAL_MANAGER_JWT = {
  iss: 'ppeMockAuthService',
  sub: 'ppe-user',
  alternativeSubject: 'ppe-user',
  roles: ['ELS-GPO AWS PPE Journal Managers'],
  featureToggles: [],
  jti: 'abf9454a-abcc-4397-9591-8d041c5453eb',
  iat: 1536936164,
  exp: 4102444800 // 01/01/2100 @ 12:00am (UTC)
}

export const NON_JOURNAL_MANAGER_JWT_ENC =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJwcGVNb2NrQXV0aFNlcnZpY2UiLCJzdWIiOiJwcGUtdXNlciIsImFsdGVybmF0aXZlU3ViamVjdCI6InBwZS11c2VyIiwicm9sZXMiOlsiRUxTLUdQTyBBV1MgUFBFIFNvbWUgT3RoZXIgUm9sZSJdLCJmZWF0dXJlVG9nZ2xlcyI6W10sImp0aSI6ImFiZjk0NTRhLWFiY2MtNDM5Ny05NTkxLThkMDQxYzU0NTNlYiIsImlhdCI6MTUzNjkzNjE2NCwiZXhwIjo0MTAyNDQ0ODAwfQ.QFD-u7OMZFoNj-AN3DrcPmSiozWBB1xB7XFlOFBeMvM'

export const NON_JOURNAL_MANAGER_JWT = {
  iss: 'ppeMockAuthService',
  sub: 'ppe-user',
  alternativeSubject: 'ppe-user',
  roles: ['ELS-GPO AWS PPE Some Other Role'],
  featureToggles: [],
  jti: 'abf9454a-abcc-4397-9591-8d041c5453eb',
  iat: 1536936164,
  exp: 4102444800 // 01/01/2100 @ 12:00am (UTC)
}

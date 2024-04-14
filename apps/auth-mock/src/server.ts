import buildApp from './buildApp'
import { config } from '../config'

const app = buildApp()

app.listen(config.authMock.port, () => console.log(`Auth Mock listening on http://localhost:${config.authMock.port}`))

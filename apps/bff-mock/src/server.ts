import buildApp, { log } from './buildApp'
import { config } from '../config'

const app = buildApp('mock.json')

app.listen(config.bffMock.port, () => log.info(`BFF Mock listening on  http://localhost:${config.bffMock.port}`))

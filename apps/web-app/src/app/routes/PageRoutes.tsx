import { Routes, Route } from 'react-router-dom'
import { JournalsProductionHub } from '../../components/journalProductionHub/JournalsProductionHub'
import FindIssue from 'findIssue/App'

export const WEB_APP_PATH = '/web/ppe-web-journals-production-hub'
export const FIND_AN_ISSUE = `${WEB_APP_PATH}/find-issue`

const PageRoutes = () => (
  <Routes>
    <Route path={WEB_APP_PATH} element={<JournalsProductionHub />} />
    <Route path={FIND_AN_ISSUE} element={<FindIssue />} />
    <Route path="*" element={<JournalsProductionHub />} />
  </Routes>
)

export default PageRoutes

import axios from 'axios'
import { Person } from '../components/person/types'

export interface PersonResponse {
  persons: Person[]
}
interface PersonApi {
  fetchPersonDetails: () => Promise<PersonResponse>
}

const getPersons = (apiPath: string) => {
  return async (): Promise<PersonResponse> => {
    const { data } = await axios.get(`${apiPath}/persons`, {})
    return data
  }
}

const personApi = (apiPath: string): PersonApi => {
  const fetchPersonDetails = getPersons(apiPath)
  return { fetchPersonDetails }
}

export default personApi

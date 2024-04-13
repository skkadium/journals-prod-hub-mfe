import { shallow } from 'zustand/shallow'
import useGetPersonDetails from '../../hooks/useGetPersonDetails'
import usePersonStore from '../../store/person/personStore'
import FixedTable from '../ui/FixedTable'
import { Person } from './types'

const PersonView = () => {
  useGetPersonDetails()
  const persons = usePersonStore(state => state.persons, shallow)
  return (
    <FixedTable.Table label="tasklist" className="c-person__table">
      <FixedTable.Header>
        <FixedTable.Head>
          <FixedTable.HeaderRow>
            <FixedTable.HeaderCell className="c-person__name">FullName</FixedTable.HeaderCell>
            <FixedTable.HeaderCell className="c-person__bio">Bio</FixedTable.HeaderCell>
            <FixedTable.HeaderCell className="c-person__job-title">Job Title</FixedTable.HeaderCell>
            <FixedTable.HeaderCell className="c-person__email-id">Email Id</FixedTable.HeaderCell>
            <FixedTable.HeaderCell className="c-person__zodiac-sign">Zodiac Sign</FixedTable.HeaderCell>
          </FixedTable.HeaderRow>
        </FixedTable.Head>
      </FixedTable.Header>
      <FixedTable.Grid>
        <FixedTable.Body>
          {persons.map((person: Person) => {
            return (
              <FixedTable.WrapperRow key={person.name}>
                <FixedTable.Row key={person.name}>
                  <FixedTable.Cell className="c-person__name">{person.name}</FixedTable.Cell>
                  <FixedTable.Cell className="c-person__bio">{person.bio}</FixedTable.Cell>
                  <FixedTable.Cell className="c-person__job-title">{person.jobTitle}</FixedTable.Cell>
                  <FixedTable.Cell className="c-person__email-id">{person.emailId}</FixedTable.Cell>
                  <FixedTable.Cell className="c-person__zodiac-sign">{person.zodiacSign}</FixedTable.Cell>
                </FixedTable.Row>
              </FixedTable.WrapperRow>
            )
          })}
        </FixedTable.Body>
      </FixedTable.Grid>
    </FixedTable.Table>
  )
}

export default PersonView

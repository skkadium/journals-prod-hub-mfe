import { act, cleanup, screen } from '@testing-library/react'
import { JOURNAL_MANAGER_JWT_ENC } from '../../utils/jwt'
import AppRoot from '../AppRoot'
import { mockedPersonDetails, renderWithQueryProvider } from '../../jest/jest.setup.unit'
import usePersonStore from '../../store/person/personStore'
import useGetPersonDetails from '../../hooks/useGetPersonDetails'

jest.mock('../../hooks/useGetPersonDetails')

const useGetPersonDetailsMock = useGetPersonDetails as jest.Mock
describe('app/AppRoot', () => {
  const initialPersonState = usePersonStore.getState()

  beforeEach(() => {
    localStorage.clear()
    usePersonStore.setState(initialPersonState, true)
  })
  afterEach(cleanup)

  it('should render application when stored JWT is valid', async () => {
    // Arrange
    const ppeJwt = JOURNAL_MANAGER_JWT_ENC
    localStorage.setItem('ppeJwt', ppeJwt)

    useGetPersonDetailsMock.mockImplementation(() => ({ isSuccess: true, data: { persons: [] } }))
    usePersonStore.setState({ persons: [] })

    // Act
    const { container } = await act(async () => renderWithQueryProvider(<AppRoot />))

    // Assert
    const heading = container.querySelector('h2')
    const columnHeaders = await screen.findAllByRole('columnHeader')

    expect(heading).toHaveTextContent('PPE Web Application')

    expect(columnHeaders).toHaveLength(5)
    expect(columnHeaders.at(0)).toHaveTextContent('FullName')
    expect(columnHeaders.at(1)).toHaveTextContent('Bio')
    expect(columnHeaders.at(2)).toHaveTextContent('Job Title')
    expect(columnHeaders.at(3)).toHaveTextContent('Email Id')
    expect(columnHeaders.at(4)).toHaveTextContent('Zodiac Sign')
  })

  it('should render application with Person Details', async () => {
    // Arrange
    const ppeJwt = JOURNAL_MANAGER_JWT_ENC
    localStorage.setItem('ppeJwt', ppeJwt)

    useGetPersonDetailsMock.mockImplementation(() => ({ isSuccess: true, data: { persons: mockedPersonDetails } }))
    usePersonStore.setState({ persons: mockedPersonDetails })

    // Act
    const { container } = await act(async () => renderWithQueryProvider(<AppRoot />))

    // Assert
    const heading = container.querySelector('h2')
    const columnHeaders = await screen.findAllByRole('columnHeader')
    const cells = await screen.findAllByRole('cell')

    expect(heading).toHaveTextContent('PPE Web Application')

    expect(columnHeaders).toHaveLength(5)
    expect(columnHeaders.at(0)).toHaveTextContent('FullName')
    expect(columnHeaders.at(1)).toHaveTextContent('Bio')
    expect(columnHeaders.at(2)).toHaveTextContent('Job Title')
    expect(columnHeaders.at(3)).toHaveTextContent('Email Id')
    expect(columnHeaders.at(4)).toHaveTextContent('Zodiac Sign')

    expect(cells).toHaveLength(10)

    // Row 1
    expect(cells.at(0)).toHaveTextContent('Winifred Watsica')
    expect(cells.at(1)).toHaveTextContent('writer, creator, dreamer')
    expect(cells.at(2)).toHaveTextContent('Senior Markets Officer')
    expect(cells.at(3)).toHaveTextContent('ezekiel84@yahoo.com')
    expect(cells.at(4)).toHaveTextContent('Pisces')

    // Row 2
    expect(cells.at(5)).toHaveTextContent('Darlene Leffler')
    expect(cells.at(6)).toHaveTextContent('analysis fan, parent 🇭🇹')
    expect(cells.at(7)).toHaveTextContent('District Infrastructure Administrator')
    expect(cells.at(8)).toHaveTextContent('trey96@gmail.com')
    expect(cells.at(9)).toHaveTextContent('Cancer')
  })
})

import { cleanup, render, screen } from '@testing-library/react'
import useGetPersonDetails from '../../../hooks/useGetPersonDetails'
import usePersonStore from '../../../store/person/personStore'
import PersonView from '../PersonView'
import { mockedPersonDetails } from '../../../jest/jest.setup.unit'

// Mock useGetPersonDetails hook
jest.mock('../../../hooks/useGetPersonDetails')
const useGetPersonDetailsMock = useGetPersonDetails as jest.Mock

describe('components/person/PersonView', () => {
  const initialPersonState = usePersonStore.getState()
  beforeEach(() => {
    usePersonStore.setState(initialPersonState, true)
  })

  afterEach(cleanup)

  it('should display Person details screen with no details', async () => {
    // Arrange
    useGetPersonDetailsMock.mockImplementation(() => ({ isSuccess: true, data: { persons: [] } }))
    usePersonStore.setState({ persons: [] })

    // Act
    render(<PersonView />)

    // Assert
    const personsTable = screen.getByRole('table')
    const columnHeaders = await screen.findAllByRole('columnHeader')

    expect(personsTable).toBeVisible()
    expect(columnHeaders).toHaveLength(5)
    expect(columnHeaders.at(0)).toHaveTextContent('FullName')
    expect(columnHeaders.at(1)).toHaveTextContent('Bio')
    expect(columnHeaders.at(2)).toHaveTextContent('Job Title')
    expect(columnHeaders.at(3)).toHaveTextContent('Email Id')
    expect(columnHeaders.at(4)).toHaveTextContent('Zodiac Sign')
  })

  it('should display Person details screen with no details', async () => {
    // Arrange
    useGetPersonDetailsMock.mockImplementation(() => ({ isSuccess: true, data: { persons: mockedPersonDetails } }))
    usePersonStore.setState({ persons: mockedPersonDetails })

    // Act
    render(<PersonView />)

    // Assert
    const personsTable = screen.getByRole('table')
    const cells = await screen.findAllByRole('cell')

    expect(personsTable).toBeVisible()
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

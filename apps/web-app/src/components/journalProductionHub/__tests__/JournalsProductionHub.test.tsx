import { cleanup, render, screen } from '@testing-library/react'
import { JournalsProductionHub } from '../JournalsProductionHub'
describe('components/hub/Hub', () => {
  beforeEach(() => {
    render(<JournalsProductionHub />).container
  })

  afterEach(cleanup)

  it('should render a Journals Production Hub Page', () => {
    expect(screen.getByText(/Welcome to Journals Production Hub/)).toBeVisible()
    expect(screen.getByText(/We are launching our features soon/)).toBeVisible()
  })
})

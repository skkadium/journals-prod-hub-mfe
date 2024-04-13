import { cleanup, render, screen } from '@testing-library/react'
import { WrapperRow } from '../WrapperRow'

describe('components/ui/FixedTable/WrapperRow', () => {
  afterEach(cleanup)
  it('should render the table row', () => {
    const { container } = render(
      <WrapperRow faded highlighted>
        <span id="test" />
      </WrapperRow>
    )
    const tableWrapperRow = container.getElementsByClassName('c-fixed-table__wrapper-row')
    expect(tableWrapperRow).toHaveLength(1)
    expect(screen.getByRole('row')).toBeVisible()
  })

  it('should apply .highlighted style when highlighted ', () => {
    render(
      <WrapperRow highlighted>
        <span id="test" />
      </WrapperRow>
    )
    expect(screen.getByRole('row')).toHaveClass('highlighted')
  })

  it('should not apply .highlighted style when not highlighted ', () => {
    render(
      <WrapperRow>
        <span id="test" />
      </WrapperRow>
    )
    expect(screen.getByRole('row')).not.toHaveClass('highlighted')
  })

  it('should apply .c-fixed-table--fade when faded', () => {
    render(
      <WrapperRow faded>
        <span id="test" />
      </WrapperRow>
    )
    expect(screen.getByRole('row')).toHaveClass('c-fixed-table--fade')
  })

  it('should not apply .c-fixed-table--fade when not faded', () => {
    render(
      <WrapperRow>
        <span id="test" />
      </WrapperRow>
    )
    expect(screen.getByRole('row')).not.toHaveClass('c-fixed-table--fade')
  })

  it('should render additional classNames', () => {
    render(
      <WrapperRow classNames={['section_heading', 'big', 'blue']}>
        <span id="test" />
      </WrapperRow>
    )
    expect(screen.getByRole('row')).toHaveClass('section_heading')
    expect(screen.getByRole('row')).toHaveClass('big')
    expect(screen.getByRole('row')).toHaveClass('blue')
  })

  it('should render standard and additional classNames', () => {
    render(
      <WrapperRow highlighted classNames={['section_heading', 'big', 'blue']}>
        <span id="test" />
      </WrapperRow>
    )
    expect(screen.getByRole('row')).toHaveClass('section_heading')
    expect(screen.getByRole('row')).toHaveClass('big')
    expect(screen.getByRole('row')).toHaveClass('blue')
    expect(screen.getByRole('row')).toHaveClass('highlighted')
    expect(screen.getByRole('row')).toHaveClass('c-fixed-table__wrapper-row')
  })
})

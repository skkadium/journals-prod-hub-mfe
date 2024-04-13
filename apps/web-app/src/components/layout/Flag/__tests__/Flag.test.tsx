import { cleanup, render } from '@testing-library/react'
import { Flag } from '../Flag'

describe('components/layout/Flag', () => {
  let container: HTMLElement
  beforeEach(() => {
    container = render(
      <Flag className="test-class">
        <span id="test" />
      </Flag>
    ).container
  })

  afterEach(cleanup)

  it('should render a flag', () => {
    const flag = container.getElementsByClassName('o-flag')
    expect(flag).toHaveLength(1)
  })

  it("should render it's children", () => {
    const spanElement = container.querySelector('#test')
    expect(spanElement).toBeInTheDocument()
  })

  it('should apply the className prop', () => {
    const flag = container.getElementsByClassName('o-flag')
    expect(flag.item(0)).toHaveClass('test-class')
  })
})

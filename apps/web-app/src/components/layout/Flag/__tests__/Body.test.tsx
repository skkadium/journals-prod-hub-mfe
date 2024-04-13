import { cleanup, render } from '@testing-library/react'
import { Body } from '../Body'

describe('components/layout/Flag/Body', () => {
  let container: HTMLElement
  beforeEach(() => {
    container = render(
      <Body className="test-class">
        <span id="test" />
      </Body>
    ).container
  })

  afterEach(cleanup)

  it('should render a flag body', () => {
    const flagBody = container.getElementsByClassName('o-flag__body')
    expect(flagBody).toHaveLength(1)
  })

  it("should render it's children", () => {
    const spanElement = container.querySelector('#test')
    expect(spanElement).toBeInTheDocument()
  })

  it('should apply the className prop', () => {
    const flagBody = container.getElementsByClassName('o-flag__body')
    expect(flagBody.item(0)).toHaveClass('test-class')
  })
})

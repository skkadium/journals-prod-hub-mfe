import { cleanup, render } from '@testing-library/react'
import { Flood } from '../Flood'

describe('components/layout/Flood', () => {
  let container: HTMLElement
  beforeEach(() => {
    container = render(
      <Flood>
        <span id="test" />
      </Flood>
    ).container
  })

  afterEach(cleanup)

  it('should render a flood object', () => {
    const floodElement = container.getElementsByClassName('o-flood')
    expect(floodElement).toHaveLength(1)
  })

  it("should render it's children", () => {
    const spanElement = container.querySelector('#test')
    expect(spanElement).toBeInTheDocument()
  })
})

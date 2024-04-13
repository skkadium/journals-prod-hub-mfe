import { cleanup, render } from '@testing-library/react'
import { Component } from '../Component'

describe('components/layout/Flag/Component', () => {
  let container: HTMLElement
  beforeEach(() => {
    container = render(
      <Component className="test-class">
        <span id="test" />
      </Component>
    ).container
  })

  afterEach(cleanup)

  it('should render a flag component', () => {
    const flagComponent = container.getElementsByClassName('o-flag__component')
    expect(flagComponent).toHaveLength(1)
  })

  it("should render it's children", () => {
    const spanElement = container.querySelector('#test')
    expect(spanElement).toBeInTheDocument()
  })

  it('should apply the className prop', () => {
    const flagComponent = container.getElementsByClassName('o-flag__component')
    expect(flagComponent.item(0)).toHaveClass('test-class')
  })
})

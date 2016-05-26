import React, { Component, PropTypes } from 'react'
import { Ripple } from './ripple'

class RippleButton extends Component {

  static propTypes = {
    children: PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.element,
    ]).isRequired,
    onClick: PropTypes.func.isRequired,
    text: PropTypes.string,
  }

  constructor() {
    super()
    this.state = {
      cursorPos: {}
    }
  }

  handleClick(e) {
    // Get Cursor Position
    let cursorPos = {
      top: e.clientY,
      left: e.clientX,
      // Prevent Component duplicates do ripple effect at the same time
      time: Date.now()
    }
    this.setState({ cursorPos: cursorPos })
  }

  render() {
    return (
      <button
        className="glare_button Ripple-parent"
        onMouseUp={(e) => {
          this.handleClick(e)
          this.props.onClick()
        }}
        onTouchend={(e) => {
          this.handleClick(e)
          this.props.onClick()
        }}>
        {this.props.children}
        <Ripple cursorPos={this.state.cursorPos} />
      </button>
    )
  }
}

export default RippleButton

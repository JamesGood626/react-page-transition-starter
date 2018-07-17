import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import { TweenMax } from 'gsap'

const Span = styled.span`
  position: relative;
  top: 2rem;
  left: 2rem;
  font-size: 1rem;
  color: #371732;
`

const OverlayDiv = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2000;
  height: 100vh;
  width: 100vw;
  background-color: limegreen;

  // @media (min-width: 900px) {
  //   display: none;
  // }
`

class TransitionOverlay extends Component {
  constructor(props) {
    super(props)
    this.transitionOverlayContainer = document.createElement('div')
    document.body.appendChild(this.transitionOverlayContainer)
  }

  componentDidMount() {
    console.log(this.overlay)
    TweenMax.fromTo(this.overlay, 1, {x: -1000}, {x: 0})
  }

  componentWillUnmount() {
    document.body.removeChild(this.transitionOverlayContainer)
  }

  render() {
    return ReactDOM.createPortal(
      <div className="overlay" ref={x => this.overlay = x}></div>
      , this.transitionOverlayContainer
    )
  }
}

export default TransitionOverlay

// style={ visible ? showStyle : hideStyle }
// const { visible } = this.props
//     const showStyle = {
//       'display': 'block'
//     }
//     const hideStyle = {
//       'display': 'none'
//     }
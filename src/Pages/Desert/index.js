import React, { Component } from 'react'
import styled from 'styled-components'


const Div = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: #fcfafa;
  line-height: 100vh;
  text-align: center;
  font-size: 5rem;
  color: #333;
`

class Desert extends Component {
  render() {
    return (
      <Div>Desert</Div>
    )
  }
}

export default Desert
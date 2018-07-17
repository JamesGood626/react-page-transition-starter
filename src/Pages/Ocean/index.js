import React, { Component } from 'react'
import styled from 'styled-components'


const Div = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: #333;
  line-height: 100vh;
  text-align: center;
  font-size: 5rem;
  color: #fcfafa;
`

class Ocean extends Component {
  render() {
    return (
      <Div>Ocean</Div>
    )
  }
}

export default Ocean
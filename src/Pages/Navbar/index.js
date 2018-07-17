import React, { Component } from 'react'
import Media from 'react-media'
import styled from 'styled-components'
import MenuItems from './menuItems'
import Overlay from './Overlay'

const Div = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-width: 16rem;
  margin: 0;
  padding: 0;
`

const ContainerDiv = Div.extend`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 200;
  height: 5rem;
  width: 100vw;
  line-height: 5rem;
  text-align: center;

  @media (max-width: 900px) {
    flex-direction: row;
    height: 5.3rem;
    width: 100vw;
  }
`

// const NameDiv = Div.extend`
//   width: 100%;
//   height: 6rem;
//   background-color: #371732;

//   @media (max-width: 900px) {
//     height: 100%;
//   }
// `

const P = styled.p`
  margin: 0;
  padding: 0;
  color: #fcfafa;
`

class Navbar extends Component {
  constructor(props) {
    super(props)
    this.state = { overlayActive: false }
    this.toggleOverlay = this.toggleOverlay.bind(this)
  }

  toggleOverlay() {
    this.setState({ overlayActive: !this.state.overlayActive })
  }

  // full screen MenuItems component will need react-media to set it to display: none for small screens.
  render() {
    return(
      <ContainerDiv>
        {/* <div onClick={ this.toggleOverlay }>X</div> */}
        <Media query="(min-width: 900px)">
          {matches =>
            matches ?
              <MenuItems location={ this.props.location } menuItems={ this.props.menuItems }/>
            : null
          }
        </Media>
        {this.state.overlayActive &&
          <Overlay onClose={this.toggleOverlay}>
            <MenuItems location={ this.props.location } menuItems={ this.props.menuItems }/>
          </Overlay>
        }
      </ContainerDiv>
    )
  }
  
}

export default Navbar
import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { Route, Switch  } from 'react-router-dom'
import { TransitionGroup, Transition } from 'react-transition-group'
import { TweenMax } from 'gsap'
import styled from 'styled-components'

import Navbar from './Pages/Navbar'
import Home from './Pages/Home'
import Desert from './Pages/Desert'
import Ocean from './Pages/Ocean'
import RainForest from './Pages/RainForest'
import Tundra from './Pages/Tundra'

import TransitionOverlay from './PageTransition/TransitionOverlay'



const Div = styled.div`
  display: flex;
`

const Section = styled.section`
  z-index: 100;
  width: 100vw;
  height: 100vh;
  // padding-bottom: 2rem;
`

// Okay, so this.props.history.length is a reliable source for determining the
// size of the routing stack
// As well as this.props.history.action giving PUSH or POP on each page navigation
// Either of those could feasibly be used for manipulating the transition animation
// On second consideration, length isn't declining on each POP action, so perhaps just make use 
// of action to determine whether navigation is forwards or backwards
class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      transitionOverlayActive: false,
    }

    console.log("App's props")
    console.log(this.props.location)
    this.activateTransitionOverlay = this.activateTransitionOverlay.bind(this)
    this.deactivateTransitionOverlay = this.deactivateTransitionOverlay.bind(this)
    // this.animateTransitionOverlay = this.activateTransitionOverlay.bind(this)
    this.enterTransition = this.enterTransition.bind(this)
    this.leaveTransition = this.leaveTransition.bind(this)
  }

  componentDidMount() {
    console.log(this.transitionOverlay)
  }

  activateTransitionOverlay() {
    this.setState((prevState, state) => ({
      transitionOverlayActive: !prevState.transitionOverlayActive
    }))
    setTimeout(this.deactivateTransitionOverlay, 1000)
  }

  deactivateTransitionOverlay() {
    this.setState((prevState, state) => ({
      transitionOverlayActive: !prevState.transitionOverlayActive
    }))
  }

  // animateTransitionOverlay() {
  //   console.log('animating transition overlay')
  //   TweenMax.fromTo(this.transitionOverlay, 0.5, {x: -1000}, {x: 0})
  // }

  // action ftw, successfully manages forward and backward routing navigation animations.
  enterTransition(node) {
    let { action } = this.props.history

    if (action === 'PUSH') {
      this.activateTransitionOverlay()
      // TweenMax.fromTo(node, 0.5, {x: -1000}, {x: 0})
      // if(this.transitionOverlay) {
      //   TweenMax.fromTo(this.transitionOverlay, 0.7, {x: -1000}, {x: 0})
      // }
      
      // TweenMax.set(node, {css:{zIndex:2000}})
      // TweenMax.set(this.navBar, {css:{zIndex:0}})
    }
    else {
      // TweenMax.fromTo(node, 0.5, {x: 100}, {x: 0})
      // TweenMax.set(node, {css:{zIndex:2000}})
      // TweenMax.set(this.navBar, {css:{zIndex:2000}})
    }
  }

  leaveTransition(node) {
    console.log("firing from leave transition")
    // let { action } = this.props.history

    // if (action === 'PUSH') {
    //   TweenMax.fromTo(node, 5, {x: 0, opacity: 1}, {x: 100, opacity: 0})
    // }
    // else {
    //   TweenMax.fromTo(node, 5, {x: 0, opacity: 1}, {x: -100, opacity: 0})
    // }
  }


  // The { ...route } object spread is an interesting use case
  // Slightly resembles the example in react-router's docs for Route's render prop
  // Annnd as of right now, wrapping Switch in a transition group doesn't trigger
  // componentWillAppear at all for the routes
  // The github example is making use of CSSTransitionGroup
  render() {
    // More than likely going to have to move this to redux store to keep track of active link
    // Or handle this by using App component's state.
    let { location } = this.props
    const { transitionOverlayActive } = this.state
    const navItems = [{name: 'Home', path: '/'}, {name: 'Ocean', path: '/ocean'}, {name: 'Desert', path: '/desert'}, {name: 'Tundra', path: '/tundra'}, {name: 'RainForest', path: '/rain-forest'}]
    // Will place underlay at top as a conditional for which a state flag will trigger.
    // Main section will be set to -200vw on transition start
    // overlay -100vw
    // and they'll commence to slide on over, with their difference easings and what not.
    return (
      <Div>
        <Navbar location={ location } menuItems={ navItems }/>
        <TransitionGroup>
          <Transition
            in={ this.props.in }
            key={ location.pathname }
            timeout={ 900 }
            mountOnEnter={ true }
            unountOnExit={ false } 
            onEnter={ this.enterTransition }
            onExit={ this.leaveTransition }  
          >
            <Section>
              <Switch location={ location }>
                <Route exact path="/" component={ Home }/>
                <Route exact path="/ocean" component={ Ocean }/>
                <Route exact path="/desert" component={ Desert }/>
                <Route exact path="/tundra" component={ Tundra }/>
                <Route exact path="/rain-forest" component={ RainForest }/>
              </Switch>
            </Section>
          </Transition>
        </TransitionGroup>
        { transitionOverlayActive ? <TransitionOverlay ref={x => this.transitionOverlay = x}/> : null}
      </Div> 
    )
  }
}

export default withRouter(App)

// ref={x => this.transitionOverlay = x} visible={ transitionOverlayActive }

// Okay, just for documentation purposes, I'll list a few of the issues I'm having
// This is with App being exported withRouter(App) and then rendered in index.js with
// Provider => BrowserRouter => withRouter(App) parent child hierarchy

// 1. Trying to use react-transition-group w/ or w/ out plus
//    When I wrap the Switch, no componentWillAppear/Leave lifecycle hooks are added.
//    -The only thing I can think of to remedy this is to create an HOC that wraps the
//    -About, Contact, etc components in TransitionGroup, and then use that HOC in the
//    -Route's component prop
//    -However, I believe that won't remedy the main problem I'm having, which is to ensure
//    -That the unmounting component stays visible while it's transitioning out and the
//    -new component is transitioning in.

// 2. Wrapping Switch in ReactCSSTransitionGroup animates components in, but doesn't
//    Satisfactorily animate them with the requirements delineated in the last few lines
//    listed above.
//    -This leads to be believe that I'll need to make use of Route's children func
//    -As React Router's docs specifiy that it could be useful for animation,
//    -match's usage inside the children func is still somewhat elusive to me,
//    -but logging it out for About I get an object that contains
//    {path: "/about", url:"/about", isExact: true, params: (contains a __proto__ object)}


// I need to step away from this and learn the History API and come back later

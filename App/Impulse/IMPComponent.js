//@flow
import React from 'react'
import IMPLog from './IMPLog'
import * as Lifecycle from './lib/Lifecycle'
import EventEmitter from 'EventEmitter'
import Sentry from '../Sentry'
import Config from '../Config'

export default class IMPComponent extends React.Component {

  // Protected
  _fileName = null
  _className = null
  navigator = null



  navigator = {
    push: (route) => {

      this.props.navigator.push(route)

    },
    pop: () => {

      this.props.navigator.pop()

    }
  }

  _track = lifecycleStage => {
    if(Config.debug) {
      // Debug mode
      if(Config.debugReact)
        IMPLog.react(this._className, lifecycleStage)

    } else {
      // Production mode
      Sentry.addBreadcrumb(this._className, lifecycleStage)
    }
  }

  constructor(props) {
    super(props)
    this._fileName = this.constructor.name+'.js'
    this._className = this.constructor.name
    
    navigator = this.props.navigator
    dispatch = this.props.dispatch

    this.props._eventEmitter.addListener('onWillFocus'+this._className, this.componentWillFocus, this)
    this.props._eventEmitter.addListener('onDidFocus'+this._className, this.componentDidFocus, this)

    this._track(Lifecycle.CONSTRUCTOR)

  }

  componentWillFocus() {
    this._track(Lifecycle.COMPONENT_WILL_FOCUS)
  }

  componentDidFocus(event,callback) {
    this._track(Lifecycle.COMPONENT_DID_FOCUS)
  }

  componentWillMount() {
    this._track(Lifecycle.COMPONENT_WILL_MOUNT)
  }

  componentDidMount() {
    this._track(Lifecycle.COMPONENT_DID_MOUNT)
  }

  componentWillReceiveProps() {
    this._track(Lifecycle.COMPONENT_WILL_RECEIEVE_PROPS)
  }

  shouldComponentUpdate(nextProps, nextState) {
    this._track(Lifecycle.SHOULD_COMPONENT_UPDATE)

    // Must return true
    return true
  }

  componentWillUpdate(nextProps, nextState) {
    this._track(Lifecycle.COMPONENT_WILL_UPDATE)
  }

  componentDidUpdate(preProps, prevState) {
    this._track(Lifecycle.COMPONENT_DID_UPDATE)
  }

  componentWillUnmount() {
    this._track(Lifecycle.COMPONENT_WILL_UNMOUNT)

    // Remove event listeners
    this.props._eventEmitter.removeListener('onWillFocus'+this._className, this.componentWillFocus, this)
    this.props._eventEmitter.removeListener('onDidFocus'+this._className,this.componentDidFocus, this)
  }

  render() {
    this._track(Lifecycle.RENDER)
  }
}
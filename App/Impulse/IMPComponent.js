import React from 'react'
import IMPLog from './IMPLog'
import * as Lifecycle from './lib/Lifecycle'

export default class IMPComponent extends React.Component {

  FILENAME = 'IMPComponent.js'
  READY_TO_RENDER = false

  constructor(props) {
    super(props)
    IMPLog.react(this.FILENAME,Lifecycle.CONSTRUCTOR)
  }

  componentWillFocus(event) {
    console.log('IMPComponent', 'WILL_FOCUS')
    IMPLog.react(this.FILENAME,Lifecycle.COMPONENT_WILL_FOCUS)

  }

  componentDidFocus(event) {
    console.log('IMPComponent', 'DID_FOCUS')

    IMPLog.react(this.FILENAME, Lifecycle.COMPONENT_DID_FOCUS)
    console.log('EVENT ',event.target._currentRoute.scene.displayName)
  }

  componentWillMount() {
    IMPLog.react(this.FILENAME, Lifecycle.COMPONENT_WILL_MOUNT)
    // They return something
    this.props.navigator.navigationContext.addListener('willfocus', this.componentWillFocus.bind(this))
    this.props.navigator.navigationContext.addListener('didfocus', this.componentDidFocus.bind(this))

  }

  componentDidMount() {
    IMPLog.react(this.FILENAME, Lifecycle.COMPONENT_DID_MOUNT)
  }

  componentWillReceiveProps() {
    IMPLog.react(this.FILENAME, Lifecycle.COMPONENT_WILL_RECEIEVE_PROPS)
  }

  shouldComponentUpdate(nextProps, nextState) {
    IMPLog.react(this.FILENAME, Lifecycle.SHOULD_COMPONENT_UPDATE)
    return true;
  }

  componentWillUpdate(nextProps, nextState) {
    IMPLog.react(this.FILENAME, Lifecycle.COMPONENT_WILL_UPDATE)
  }

  componentDidUpdate(preProps, prevState) {
    IMPLog.react(this.FILENAME, Lifecycle.COMPONENT_DID_UPDATE)
  }

  componentWillUnmount() {
    IMPLog.react(this.FILENAME, Lifecycle.COMPONENT_WILL_UNMOUNT)
  }

  render() {
    IMPLog.react(this.FILENAME, Lifecycle.RENDER)
  }
}
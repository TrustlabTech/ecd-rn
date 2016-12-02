import React from 'react'
import IMPLog from './IMPLog'
import * as Lifecycle from './lib/Lifecycle'

export default class IMPComponent extends React.Component {

  FILENAME = 'IMPComponent.js'

  constructor(props) {
    super(props)
    IMPLog.react(this.FILENAME,Lifecycle.CONSTRUCTOR)
  }

  componentWillFocus() {
    IMPLog.react(this.FILENAME,Lifecycle.COMPONENT_WILL_FOCUS)
  }

  componentDidFocus() {
    IMPLog.react(this.FILENAME, Lifecycle.COMPONENT_DID_FOCUS)
  }

  componentWillMount() {
    IMPLog.react(this.FILENAME, Lifecycle.COMPONENT_WILL_MOUNT)

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
import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableHighlight
} from 'react-native'

import Scene from '../Components/Scene'
import SceneView from '../Components/SceneView'
import NavBar from '../Components/NavBar'
import Config from '../Config'
import WaitModal from '../Components/WaitModal'
import ChildCheckbox from '../Components/ChildCheckbox'
import { FontSizes } from '../GlobalStyles'
import DateText from '../Components/DateText'
import SceneHeading from '../Components/SceneHeading'
import ConfirmModal from '../Components/ConfirmModal'

export default class ClassScene extends Component {

  // ### MOUNTING ###
  constructor(props) {
    super(props)

    this.state = {
      waitingtoSend: false,       // Are we waiting to do HTTP?
      waitModalVisible: true,     // Is the wait modal visible?
      confirmModalVisible: false, // Is the confirm modal visible?
      fetching: true,             // Are we fetching data?
      attempting: false,          // Are we sending data?
      error: null,                // Was there an error?
      children: [],               // Inbound Data
      attendance: []              // Outbound data
    }
    this.fetchChildren(this.props.route.classId)
  }


  componentWillMount() {
    console.log("componentWillMount()")
  }

  componentDidMount() {
    console.log("componentDidMount()")
  }

  // ### UPDATING ###

  shouldComponentUpdate(nextProps, nextState) {
    return true // Yes, update
  }
  componentWillReceiveProps(nextProps) {
    console.log("componentWillReceiveProps")
  }

  // invoked immediately before rendering
  componentWillUpdate(nextProps, nextState) {
    console.log("componentWillUpdate")
  }

  // invoked immediately after updating occurs
  componentDidUpdate(prevProps, prevState) {
    console.log("componentDidUpdate")
    // If we're waiting to send something
    if(this.state.waitingToSend) {
      // Send it
      this.submitAttendance(this.props.route.classId)
      // And turn the flag off
      this.setState({
        waitingToSend: false
      })
    }
  }

  // ### UNMOUNTING ###
  componentWillUnmount() {
    console.log("componentWillUnmount")
  }

  // ## CUSTOM ###
  confirmSend() {
    // Queue outbound HTTP
    this.setState({
      waitingToSend: true
    })
  }

  // Change the state of checkboxes
  handlePressCheckbox(id) {
    console.log("Child key", id)
    let attendance = this.state.attendance
    attendance[id - 1].checked = !attendance[id - 1].checked
    this.setState({
      attendance
    })
  }

  isChecked(id) {
    console.log(this.state.attendance)
    return this.state.attendance[id - 1].checked
  }

  // ## RENDER ###
  render() {

    let CheckBoxes = null
    console.log(this.state.fetching)
    if(!this.state.fetching) {

      CheckBoxes = this.state.children.map( (result) => {
        var colour = this.isChecked(result.id) ? 'white': 'red'
        //Build checkbox
        return (
          <TouchableHighlight style={{height: 50, width: 200}} key={result.id} onPress={ () => this.handlePressCheckbox(result.id) }>
            <View style={{ height: 50, width: 200, backgroundColor: colour }}>
              <Text style={{fontSize: 20}}>{result.name}</Text>
            </View>
          </TouchableHighlight>
        )
      })

    } else {
      CheckBoxes = (<View><Text>Loading</Text></View>)
    }
    return (
      <Scene>
        <WaitModal
          animating={ this.state.fetching }
          visible={ this.state.waitModalVisible }
          text={ this.state.error ? this.state.error : "Loading"}
          navigator={ this.props.navigator }
          popOnClose={ true }
          ref="waitmodal"
        />
        <ConfirmModal
          animating={ this.state.attempting }
          visible={ this.state.confirmModalVisible }
          text={ this.state.error ? this.state.error : "Submit attendance?"}
          navigator={ this.props.navigator }
          onOkay={ () => { this.submitAttendance(this.props.route.classId) }}
          popOnClose={ false }
          ref="confirmmodal"
        />
        <NavBar
          title="Attendance"
          navigator={ this.props.navigator }
          rightButtonText="Done"
          rightButtonAction={ () => this.confirmSend() }
        />
        <SceneView>
          <SceneHeading text={this.props.route.className}/>
          <View style={{
            marginLeft: 20,
            marginRight: 20
          }}>
          {CheckBoxes}
          </View>
        </SceneView>
      </Scene>
    )
  }

  submitAttendance = (classId) => {
    console.log("Submitting attendance...",this.state.attendance)
    this.setState({
      attempting: true,
      waitModalVisible: true,
      error: null
    })
    var formData = new FormData()

    formData.append('attendance',this.state.attendance)


    console.log(formData)
  }

  fetchChildren = (classId) => {

    // Get the resource
    fetch(Config.http.baseUrl + "class.php?id=" + classId , {
      method: 'GET'
    })

    // Parse JSON
    .then( (response) => {
      return response.json()
    })

    // Use data
    .then( (responseJson) => {
      this.setState({
        children: responseJson.children,
        fetching: false,
        waitModalVisible: false
      })

      // Prepare outbound array
      var attendance = []
      this.state.children.forEach( (child) => {
        attendance.push({id: child.id, checked: false})
      })
      this.setState({
        attendance: attendance
      })

    })

    .catch( (error) => {
      console.log("ClassScene:fetchChildren", error)
      this.setState({
        error: "Network Error",
        fetching: false
      })

    })
  }
}
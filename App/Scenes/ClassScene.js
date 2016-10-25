import React, { Component } from 'react'
import {
  View,
  Text
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

  constructor(props) {
    super(props)
    this.state = {
      waitModalVisible: true,
      confirmModalVisible: false,
      fetching: true,
      attempting: false,
      error: null,
      children: []
    }
  }

  componentWillMount() {
    this.setState({
      fetching: true,
      attempting: false,
      error: null,
      waitModalVisible: true,
      confirmModalVisible: false
    })
    this.fetchChildren(this.props.route.classId)
  }

  confirmSend() {
    this.setState({
      confirmModalVisible: true
    })
  }

  handlePressChildCheckbox(childKey, checked) {
    let children = this.state.children
    let child = children[childKey]
    if(!child.checked) {
      child.checked = true
    } else {
      child.checked = !child.checked
    }
    children[childKey] = child
    this.setState({
      children: children
    })
  }

  render() {
    console.log(this.state)
    let Buttons = null
    if(this.state.children.length > 0 ) {
      Buttons = this.state.children.map( (result) => {
        return (
          <ChildCheckbox
            id={result.id}
            key={result.id}
            name={result.name}
            image={result.imageUrl}
            onPress={this.handlePressChildCheckbox.bind(this)}
          />
        )
      })
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
          {Buttons}
          </View>
        </SceneView>
      </Scene>
    )
  }
  submitAttendance = (classId) => {
    console.log("Submitting attendance...")
    this.setState({
      attempting: true,
      waitModalVisible: true,
      error: null
    })
    var formData = new FormData()

    formData.append('children',this.state.children)

    })
  }

  fetchChildren = (classId) => {
    this.setState({
      fetching: true,
      waitModalVisible: true,
      confirmModalVisible: false,
      error: null
    })

    fetch(Config.http.baseUrl + "class.php?id=" + classId , {
      method: 'GET'
    })


    .then( (response) =>{
    console.log(response)
      return response.json()
    })

    .then( (responseJson) => {
    console.log(responseJson)
      this.setState({
        children: responseJson.children,
        fetching: false,
        waitModalVisible: false
      })
    })

    .catch( (error) => {
      console.log("ClassScene:fetchChildren")
      this.setState({
        error: error,
        fetching: false,
        waitModalVisible: false,
      })
    })
  }
}
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

export default class ClassScene extends Component {

  constructor(props) {
    super(props)
    this.state = {
      modalVisible: true,
      fetching: true,
      error: null,
      children: []
    }
  }

  componentWillMount() {
    this.setState({
      fetching: true,
      error: null,
      modalVisible: true
    })
    this.fetchChildren(this.props.route.classId)
  }

  render() {
    let Buttons = null
    if(this.state.children.length > 0 ) {
      Buttons = this.state.children.map( (result) => {
        return (
          <ChildCheckbox
            key={result.id}
            name={result.name}
            image={result.imageUrl}
          />
        )
      })
    }
    return (
      <Scene>
        <WaitModal
          animating={ this.state.fetching }
          visible={ this.state.modalVisible }
          text={ this.state.error ? this.state.error : "Loading"}
          navigator={ this.props.navigator }
          popOnClose={ true }
          ref="waitmodal"
        />
        <NavBar
          title="Attendance"
          navigator={ this.props.navigator }
          rightButtonText="Done"
          rightButtonAction={ () => alert("Ask to confirm, then send data....")}
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

  fetchChildren = (classId) => {
    this.setState({
      fetching: true,
      modalVisible: true,
      error: null
    })
    console.log("About to fetch")
    fetch(Config.http.baseUrl + "class.php?id=" + classId , {
      method: 'GET'
    })


    .then( (response) =>{
    console.log(response)
      return response.json()
    }
    )

    .then( (responseJson) => {
    console.log(responseJson)
      this.setState({
        children: responseJson.children,
        fetching: false,
        modalVisible: false
      })
    })

    .catch( (error) => {
      console.log("ClassScene:fetchChildren")
      this.setState({
        error: error,
        fetching: false
      })
    })
  }
}
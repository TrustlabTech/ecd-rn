import React, { Component } from 'react'
import {
  View,
  Text,
  ScrollView,
  TouchableHighlight
} from 'react-native'

import Routes from '../Routes'
import NavBar from '../Components/NavBar'
import FormButton from '../Components/FormButton'
import WaitModal from '../Components/WaitModal'

export default class AttendanceScene extends Component {

  constructor(props) {
    super(props)
    console.log('CONSTRUCTOR')

    this.state = {
      fetching: true,
      classes: []
    }
  }

  componentWillMount() {
    console.log("WILL MOUNT")
    if(this.state.fetching) {
      this.fetchClasses()
    }
  }

  render() {
    let Heading = null
    let Buttons = null
    if(this.state.classes.length > 0) {

      Buttons = this.state.classes.map( (result) => (
        <FormButton key={result.id} text={result.name} width={200} height={50} onPress={ () => alert("Hah!") }/>
      )
      )
      Heading = (
        <View style={{marginTop: 20, marginBottom: 20}}>
          <Text style={{fontSize: 22}}>Select Class</Text>
        </View>
      )
    }

    return (
      <View>
        <WaitModal
          text="Loading"
          subtext="Please wait..."
          visible={ this.state.fetching }
          ref="waitmodal"
        />
        <NavBar
          title="Attendance"
          navigator={ this.props.navigator }
          route={ this.props.route }
          leftButtonText="Back"
          leftButtonAction={ () => this.props.navigator.pop() }
        />
        <ScrollView contentContainerStyle={{alignItems: 'center'}} style={{flex: 1, flexDirection: 'column'}}>
          {Heading}
          {Buttons}
        </ScrollView>


      </View>
    )
  }

  fetchClasses = () => {

    fetch('http://localhost:8989/classes.php', {
      method: 'GET'
    })

    .then((response) => {
      return response.json()
    })

    .then( (responseJson) => {
      this.setState({
        classes: responseJson.classes,
        fetching: false
      })
    })

    .catch( (error) => {
      console.log('AttendanceScene:fetchClasses', error)
      this.setState({
        error: "Network error",
        fetching: false
      })
    })
  }
}
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

export default class AttendanceScene extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View>
        <NavBar
          title="Attendance"
          navigator={ this.props.navigator }
          route={ this.props.route }
          leftButtonText="Back"
          leftButtonAction={ () => this.props.navigator.pop() }
        />
        <ScrollView contentContainerStyle={{alignItems: 'center'}} style={{flex: 1, flexDirection: 'column'}}>
          <View style={{marginTop: 20}}>
            <Text style={{fontSize: 20}}>Select Class</Text>
          </View>
          <FormButton text="Class 1 - Miriam" width={200} height={50}
            onPress={ () => {Routes.class.param = "Test"
              this.props.navigator.push(Routes.class)}
          }/>
          <FormButton text="Class 2 - Sofie" width={200} height={50} onPress={ () => alert("Fick dich") }/>
          <FormButton text="Class 3 - Patricia" width={200} height={50} onPress={ () => alert("Fick dich") }/>

        </ScrollView>

      </View>
    )
  }
}
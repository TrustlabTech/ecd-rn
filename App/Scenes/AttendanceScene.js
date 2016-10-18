import React, { Component } from 'react'
import {
  View,
  Text,
  ScrollView,
  TouchableHighlight
} from 'react-native'

import NavBar from '../Components/NavBar'
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

          <Text>Select Class</Text>

          <TouchableHighlight>
            <Text>Class 1 - Miriam</Text>
          </TouchableHighlight>

          <TouchableHighlight>
            <Text>Class 2 - Sofie</Text>
          </TouchableHighlight>

          <TouchableHighlight>
            <Text>Class 3 - Patricia</Text>
          </TouchableHighlight>

        </ScrollView>

      </View>
    )
  }
}
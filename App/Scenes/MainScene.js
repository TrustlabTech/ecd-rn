import React, { Component } from 'react'
import {
  Text,
  View,
  Dimensions,
  Image,
  StatusBar,
  ScrollView,
  TouchableHighlight
} from 'react-native'

import NavBar from '../Components/NavBar'
import Routes from '../Routes'
import Scene from '../Components/Scene'
import SceneView from '../Components/SceneView'

export default class MainScene extends Component {

  constructor(props) {
      super(props)
  }

  render() {
    return (
        <Scene>
          <NavBar
            title="My Centre"
            navigator={ this.props.navigator }
            leftButtonText="|||"
            leftButtonAction={ this.props.leftButtonAction }
          />
          <SceneView>
            <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 15}}>
              <Text style={{fontSize: 24}}>Happy Valley Preschool</Text>
            </View>

            <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 15}}>
              <Text style={{fontSize: 18}}>Whiteriver, Mpumulanga</Text>
            </View>

            <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 15}}>
            <Image source={require('../Images/preschool.jpg')}
              style={{width: 380, height: 380}} />
            </View>

            <TouchableHighlight onPress={ () => this.props.navigator.push(Routes.attendance) }>
              <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 15, marginBottom: 20}}>
                <Text style={{fontSize: 26}}>Take Attendance</Text>
              </View>
            </TouchableHighlight>
          </SceneView>
        </Scene>
    )
  }
}

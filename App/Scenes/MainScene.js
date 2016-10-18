import React, { Component } from 'react'
import {
  Text,
  View,
  Dimensions
} from 'react-native'

import NavBar from '../Components/NavBar'
import Drawer from 'react-native-drawer'
import Config from '../Config'
import DrawerMenuItem from '../Components/DrawerMenuItem'
import MainDrawer from '../Components/MainDrawer'

export default class MainScene extends Component {

  constructor(props) {
      super(props)
  }

  render() {
    return (
      <View>
        <NavBar
            navigator={ this.props.navigator }
            route={ this.props.route }
            leftButtonText="|||"
            leftButtonAction={ this.props.leftButtonAction }
          />
          <Text>Height: { Dimensions.get('window').height }</Text>
          <Text>Width: { Dimensions.get('window').width }</Text>
      </View>

    )
  }
}

const drawerStyles = {


}
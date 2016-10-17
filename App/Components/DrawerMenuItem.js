import React, { Component } from 'react'
import{
  Text,
  View,
  TouchableHighlight,
  StyleSheet
} from 'react-native'

export default class DrawerMenuItem extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={styles.drawerMenuItemView}>
        <TouchableHighlight
          onPress={this.props.onPress}
        >
        <Text style={styles.drawerMenuItemText}>{this.props.text}</Text>
        </TouchableHighlight>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  drawerMenuItemView:{
    marginLeft: 20,
    padding: 5
  },
  drawerMenuItemText:{
    fontSize: 25
  }
})
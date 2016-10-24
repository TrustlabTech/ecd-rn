import React, { Component } from 'react'
import {
  View,
  TouchableHighlight,
  Text,
  Image,
  StyleSheet
} from 'react-native'

import { Colours, FontSizes } from '../GlobalStyles'

export default class ChildCheckbox extends Component {

  constructor(props) {
    super(props)
    this.state = {
      checked: false
    }
  }

  render() {
    let d = new Date()
    console.log(d.getDay())
    let Absent = this.state.checked ? 'Present' : 'Absent'

    let ContainerBackgroundColour = this.state.checked ? Colours.secondary : Colours.secondaryHighlight

    return (
      <TouchableHighlight onPress={ () =>
        this.setState({ checked: !this.state.checked })
      }>
        <View style={[
          styles.containerView,
          {backgroundColor: ContainerBackgroundColour}
        ]}>

          {/* Top row */}
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Image
              source={{uri: 'https://media.creativemornings.com/uploads/user/avatar/6930/small_avatar.jpg'}}
              style={{width: 85, height: 85, borderRadius: 3}}
            />
            <Text style={{padding:10, fontSize: FontSizes.h2}}>{Absent}</Text>
          </View>

          {/* Bottom row */}
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={{fontSize: FontSizes.h6}}>{ this.props.name }</Text>
          </View>

        </View>
      </TouchableHighlight>
    )
  }
}

const styles = StyleSheet.create({
  containerView: {
    flexDirection: 'column',
    padding: 5,
    marginTop: 3,
    marginBottom: 3,
    borderRadius: 3
  },
  debugBorder:{
    borderWidth: 1,
    borderColor: 'red',
    borderStyle: 'solid'
  }

})
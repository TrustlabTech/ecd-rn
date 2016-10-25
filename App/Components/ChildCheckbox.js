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

  onPress() {
    this.setState({ checked: !this.state.checked })
    this.props.onPress(this.props.id, this.state.checked)
  }

  render() {

    let Absent = this.state.checked ? 'Present' : 'Absent'

    let ContainerBackgroundColour = this.state.checked ? Colours.secondary : Colours.secondaryHighlight

    return (
      <TouchableHighlight style={styles.touchable} onPress={ () => this.onPress() }>
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
  touchable:{
    marginTop: 3,
    marginBottom: 3,
    borderRadius: 3
  },
  containerView: {
    flexDirection: 'column',
    padding: 5,
    borderRadius: 3
  },
  debugBorder:{
    borderWidth: 1,
    borderColor: 'red',
    borderStyle: 'solid'
  }

})
/**
 * Early Childhood Development App
 * @copyright 2016 Global Consent Ltd
 * Civvals, 50 Seymour Street, London, England, W1H 7JG
 * @author Werner Roets <werner@io.co.za>
 */

import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableHighlight,
  Switch
} from 'react-native'
import { Colours, FontSizes } from '../GlobalStyles'
/**
 * A configurable Checkbox
 * @example
 * <Checkbox
 *  style={'switch'}
 *  key={i}
 *  width={300}
 *  text={"Example text"}
 *  onPress={ () => someAction() }
 *  checked={true}
 * />
 */
export default class Checkbox extends Component {

  render() {
    let checkbox = null
    switch (this.props.style) {

    case 'classic':
      checkbox =
          (<TouchableHighlight
            onPress={() => this.props.onPress(!this.props.checked)}
            style={{
              borderRadius: 5
            }}
          >
            <View style={{
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'white',
              borderColor: Colours.primaryLowlight,
              borderWidth: 1,
              borderStyle: 'solid',
              borderRadius: 5,
              padding: 1,
              width: this.props.height || 45,
              height: 45 }}
            >
              <Text>{this.props.checked ? 'X' : ''}</Text>
            </View>
          </TouchableHighlight>)
      break

    case 'switch':
      checkbox =
          (<Switch
            value={this.props.checked}
            ref={(ref) => { this._switch = ref }}
            onValueChange={() => this.props.onPress()}
          />)
      break

    default:
      checkbox =
          (<Switch
            value={this.props.checked}
            ref={(ref) => { this._switch = ref }}
            onValueChange={() => this.props.onPress()}
          />)
      break
    }

    return (
      <View style={{
        flex: 1,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 5,
        marginBottom: 5,
        height: 45 }}
      >
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ flex: 1 }}>
            <Text style={{ color: Colours.primary, fontSize: FontSizes.h5, textAlign: 'left', marginLeft: 10 }}>
              {this.props.text}
            </Text>
          </View>
          {checkbox}
        </View>
      </View>
    )
  }
}

Checkbox.propTypes = {
  height: React.PropTypes.number,
  text: React.PropTypes.string,
  checked: React.PropTypes.bool,
  onPress: React.PropTypes.func,
  style: React.PropTypes.object
}

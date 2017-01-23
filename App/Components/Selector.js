/**
 * Early Childhood Development App
 * @copyright 2016 Global Consent Ltd
 * Civvals, 50 Seymour Street, London, England, W1H 7JG
 * @author Werner Roets <werner@io.co.za>
 */

import React, { Component } from 'react'
import {
  Picker,
  View
} from 'react-native'
import { Colours } from '../GlobalStyles'

/**
 * A simple picker with a border that displays a Array<String>
 * @example
 * <Selector
 *  selectedValue={this.state.selected}
 *  onValueChange={someFunction}
 *  items={['Item 1', 'Item 2', 'Item 3']}
 * />
 */
export default class Selector extends Component {

  render() {
    return (
      <View style={{
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: Colours.primaryLowlight,
        borderRadius: 5,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 4,
        marginBottom: 4
      }}>
        <Picker
          style={{ color: Colours.primaryLowlight }}
          selectedValue={this.props.selectedValue}
          onValueChange={value => this.props.onValueChange(value)}
        >
          {this.props.items.map((x, i) => (<Picker.Item key={i} label={x.name} value={x.id} />))}
        </Picker>
      </View>
    )
  }
}

Selector.propTypes = {
  items: React.PropTypes.array,
  selectedValue: React.PropTypes.string,
  onValueChange: React.PropTypes.func
}

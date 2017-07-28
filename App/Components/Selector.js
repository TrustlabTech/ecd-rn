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
          selectedValue={this.props.selectedValue}
          onValueChange={this.props.onValueChange}
          style={{ color: Colours.primaryLowlight }}>
          {
            this.props.items.map((x, i) => {
              let label = ''
              if (typeof this.props.pickerLabelDataAttribute === 'string')
                label = x[this.props.pickerLabelDataAttribute]
              else if (typeof this.props.pickerLabelDataAttribute === 'function')
                label = this.props.pickerLabelDataAttribute(x)

              return (
                <Picker.Item key={`selector-item-${Math.random()}`} label={label} value={x.id} />
              )
            })
          }
        </Picker>
      </View>
    )
  }
}

Selector.defaultProps = {
  pickerLabelDataAttribute: 'name'
}

Selector.propTypes = {
  items: React.PropTypes.array,
  onValueChange: React.PropTypes.func,
  selectedValue: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
  pickerLabelDataAttribute: React.PropTypes.oneOfType([React.PropTypes.func, React.PropTypes.string]).isRequired,
}

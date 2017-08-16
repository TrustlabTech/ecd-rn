/**
 * Early Childhood Development App
 * @copyright 2016 Global Consent Ltd
 * Civvals, 50 Seymour Street, London, England, W1H 7JG
 * @author Alberto Dallaporta <alberto.dallaporta@novalab.io>
 */

'use-strict'

// base libs
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Picker } from 'react-native'

export default class Selector extends Component {

  render() {
    return (
      <Picker
        style={this.props.style}
        selectedValue={this.props.selectedValue}
        onValueChange={this.props.onValueChange}>
        {
          this.props.items.map(x => {
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
    )
  }
}
Selector.defaultProps = {
  items: [],
  selectedValue: -1,
  pickerLabelDataAttribute: 'name'
}

Selector.propTypes = {
  items: PropTypes.array,
  onValueChange: PropTypes.func,
  selectedValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  pickerLabelDataAttribute: PropTypes.oneOfType([PropTypes.func, PropTypes.string]).isRequired,
}

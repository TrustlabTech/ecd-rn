/**
 * Early Childhood Development App
 * @copyright 2016 Global Consent Ltd
 * Civvals, 50 Seymour Street, London, England, W1H 7JG
 * @author Werner Roets <werner@io.co.za>
 */

import 'react-native'
import React from 'react'
import TextField from '../TextField'

import renderer from 'react-test-renderer'

it('renders correctly', () => {
  const tree = renderer.create(
    <TextField
      value="Test Value"
      onChangeText={ (text) => ({}) }
      placeholder="Phone Number"
      maxLength={10}
      keyboardType="phone-pad"
      returnKeyType="next"
      onSubmitEditing={ () => ({}) }
    />
  ).toJSON()
  expect(tree).toMatchSnapshot()
})

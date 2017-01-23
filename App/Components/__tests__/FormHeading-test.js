/**
 * Early Childhood Development App
 * @copyright 2016 Global Consent Ltd
 * Civvals, 50 Seymour Street, London, England, W1H 7JG
 * @author Werner Roets <werner@io.co.za>
 */

import 'react-native'
import React from 'react'
import FormHeading from '../FormHeading'

import renderer from 'react-test-renderer'

it('renders correctly', () => {
  const tree = renderer.create(
    <FormHeading text="Test FormHeading"/>
  ).toJSON()
  expect(tree).toMatchSnapshot()
})

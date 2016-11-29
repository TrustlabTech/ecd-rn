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
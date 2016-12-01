import 'react-native'
import React from 'react'
import Checkbox from '../Checkbox'

import renderer from 'react-test-renderer'

it('renders correctly', () => {
  const tree = renderer.create(
    <Checkbox text="Test Checkbox"/>
  ).toJSON()
  expect(tree).toMatchSnapshot()
})
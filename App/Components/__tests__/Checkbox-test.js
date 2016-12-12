import 'react-native'
import React from 'react'
import Checkbox from '../Checkbox'

import renderer from 'react-test-renderer'

it('renders correctly checked', () => {
  const tree = renderer.create(
    <Checkbox text="Test Checkbox" checked={true}/>
  ).toJSON()
  expect(tree).toMatchSnapshot()
})

it('renders correctly unchecked', () => {
  const tree = renderer.create(
    <Checkbox text="Test Checkbox" checked={false}/>
  ).toJSON()
  expect(tree).toMatchSnapshot()
})
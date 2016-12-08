import 'react-native'
import React from 'react'
import ScrollableScene from '../ScrollableScene'

import renderer from 'react-test-renderer'

it('renders correctly', () => {
  const tree = renderer.create(
    <ScrollableScene/>
  ).toJSON()
  expect(tree).toMatchSnapshot()
})
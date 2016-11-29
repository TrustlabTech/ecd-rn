import 'react-native'
import React from 'react'
import Scene from '../Scene'

import renderer from 'react-test-renderer'

it('renders correctly', () => {
  const tree = renderer.create(
    <Scene/>
  ).toJSON()
  expect(tree).toMatchSnapshot()
})
import 'react-native'
import React from 'react'
import SceneView from '../SceneView'

import renderer from 'react-test-renderer'

it('renders correctly', () => {
  const tree = renderer.create(
    <SceneView/>
  ).toJSON()
  expect(tree).toMatchSnapshot()
})
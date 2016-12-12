import 'react-native'
import React from 'react'
import Scene from '../Scene'

import renderer from 'react-test-renderer'

it('renders correctly loaded', () => {
  const tree = renderer.create(
    <Scene loaded={true}/>
  ).toJSON()
  expect(tree).toMatchSnapshot()
})

it('renders correctly not loaded', () => {
  const tree = renderer.create(
    <Scene loaded={false}/>
  ).toJSON()
  expect(tree).toMatchSnapshot()
})
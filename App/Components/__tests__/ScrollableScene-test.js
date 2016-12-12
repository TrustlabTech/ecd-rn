import 'react-native'
import React from 'react'
import ScrollableScene from '../ScrollableScene'

import renderer from 'react-test-renderer'

it('renders correctly loaded', () => {
  const tree = renderer.create(
    <ScrollableScene loaded={true}/>
  ).toJSON()
  expect(tree).toMatchSnapshot()
})

it('renders correctly not loaded', () => {
  const tree = renderer.create(
    <ScrollableScene loaded={false}/>
  ).toJSON()
  expect(tree).toMatchSnapshot()
})
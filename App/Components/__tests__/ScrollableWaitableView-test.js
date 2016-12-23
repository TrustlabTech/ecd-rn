import 'react-native'
import React from 'react'
import ScrollableWaitableView from '../ScrollableWaitableView'

import renderer from 'react-test-renderer'

it('renders correctly loaded', () => {
  const tree = renderer.create(
    <ScrollableWaitableView loaded={true}/>
  ).toJSON()
  expect(tree).toMatchSnapshot()
})

it('renders correctly not loaded', () => {
  const tree = renderer.create(
    <ScrollableWaitableView loaded={false}/>
  ).toJSON()
  expect(tree).toMatchSnapshot()
})
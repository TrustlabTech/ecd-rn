import 'react-native'
import React from 'react'
import renderer from 'react-test-renderer'
import IMPComponent from '../../Impulse/IMPComponent'
// jest.disableAutomock()
// import Routes from '../../Routes'
// import AttendanceScene from '../AttendanceScene'

// jest.dontMock('../../Config')
jest.dontMock('../../Routes')
// require.requireActual('../../Routes')

// jest.dontMock('../ClassScene')
// jest.dontMock('../AttendanceScene')
// jest.dontMock('../LoginScene')
require.requireActual('../../Impulse/IMPComponent')

require.requireActual('../ClassScene')
require.requireActual('../AttendanceScene')
require.requireActual('../LoginScene')
// require.requireActual('../AttendanceScene')
// require.requireMock('../AttendanceScene')
// const Config = require('../../Config').default
// console.log('debug', Config.debug)
require.requireActual('../../Routes')
require.requireActual('../../Config')

const MainScene = require('../MainScene')
it('renders correctly', () => {
  const tree = renderer.create(
    <MainScene
      route={{ hi: 'there' }}
      navigator={{ more: 'tests' }}
    />
  ).toJSON()
  // expect(tree).toMatchSnapshot()
})

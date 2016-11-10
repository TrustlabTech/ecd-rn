import React, { Component } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as appActions from '../Actions/App'
import WaitModal from '../Components/WaitModal'

class Scene extends Component {

  constructor(props) {
    super(props)
    this.actions = this.props.actions
    this.dispatch = this.props.dispatch
  }

  render() {
    const { modalWaiting, modalVisible, modalText } = this.props.state.App
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <WaitModal
          animating={ modalWaiting }
          visible={ modalVisible }
          onPressClose={ () => this.props.dispatch(appActions.setModal({modalVisible:false})) }
          text={ modalText }
          ref="waitmodal"
        />
          <View style={{flex: 1}}>
            {this.props.children}
          </View>

      </View>
    )
  }
}

export default connect(
  (state) => ({
    state: state
  }),
  (dispatch) => ({
    actions: bindActionCreators(appActions, dispatch)
  })
)(Scene)
import React, { Component } from 'react'
import { View } from 'react-native'

export default class Scene extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={{flex: 1}}>
                {this.props.children}
            </View>
        )
    }
}
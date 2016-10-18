import React, { Component } from 'react'
import {
  View,
  Text,
  MapView
} from 'react-native'

export default class GeoLocator extends Component {


  constructor(props) {
    super(props)
    this.state = {
        initialPosition: 'unknown',
        lastPosition: 'unknown'
    }

    this.watchID = null
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({initialPosition: position});
      },
      (error) => alert(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
    this.watchID = navigator.geolocation.watchPosition((position) => {
      this.setState({lastPosition: position})
    });
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID)
  }
  render() {
    var longitude, latitude
    console.log('LAST',this.state.lastPosition)
    console.log('INIT',this.state.initialPosition)
    if(this.state.lastPosition.coords !== undefined) {
      longitude = this.state.lastPosition.coords.longitude
      latitude = this.state.lastPosition.coords.latitude
      console.log('DEBUG',this.state.lastPosition.coords.longitude)
    }
      return (
        <View>
          <Text>Latitude: {latitude}</Text>
          <Text>Longitude: {latitude}</Text>
        </View>
      )
  }
}
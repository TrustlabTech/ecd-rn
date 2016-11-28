/*
 * Early Childhood Development
 * (c) 2016 Global Consent Ltd
 * Civvals, 50 Seymour Street, London, England, W1H 7JG
 * Author: Werner Roets <werner@io.co.za>
 */

import Config from './Config'
import Sentry from './Sentry'

function timestamp(currentDate) {
  return "Time: " + currentDate.getDate() + "/"
                  + (currentDate.getMonth()+1)  + "/"
                  + currentDate.getFullYear() + " @ "
                  + currentDate.getHours() + ":"
                  + currentDate.getMinutes() + ":"
                  + currentDate.getSeconds()
}

function request(route, options = {method: 'GET'} ) {

  if(Config.debug && Config.debugNetwork)
    console.log('API REQUEST',timestamp(new Date()),Config.http.baseUrl + route, options)
  else
    Sentry.addBreadcrumb('HTTP '+options.method,Config.http.baseUrl+route)

  return fetch(Config.http.baseUrl + route, options)

  // Response received
  .then((response) => {

    if(Config.debug && Config.debugNetwork)
      console.log('API RESPONSE:',response)
    else
      Sentry.addHttpBreadcrumb(Config.http.baseUrl + route, options.method, response.status)


    return response.json()
  })

  .then((json) => {

    if(json.error) {

      if(json.error instanceof Array) {
        const errorMessage = ''
        json.error.forEach((item) => {
          errorMessage += item + "\n "
        })
        return { error: errorMessage.trim() }
      } else {
        return { error: json.error }
      }

    } else {

      return json
    }
  })

  // On reject
  .catch( (error) => {

    if(Config.debug && Config.debugNetwork){
      console.log('API:ERROR', error)

      return Promise.reject(error.toString())
    } else {
      return Promise.reject(error)
    }
  })

}


export default {

  login: (phoneNumber, pin) => {
    return new Promise((resolve,reject) => {
      const formData = new FormData()
      formData.append('username', phoneNumber)
      formData.append('password', pin)
      request('staff/login',{
        body: formData,
        method: 'POST',
        headers: Config.http.headers
      }).then((data) => {
        resolve(data)
      }).catch((error) => {
        reject(error)
      })
    })
  },

  fetchCentres: (token) => {
    return new Promise((resolve,reject) => {
      request('centre',{
        headers: {...Config.http.headers, 'Authorization': 'Bearer: ' + token.trim() }
      })
      .then( (data) => {
        resolve(data)
      })
      .catch((error) => {
        reject(error)
      })
    })
  },


  fetchClasses: (staffId, token) => {
    return new Promise((resolve,reject) => {
      request('class/attendance/' + staffId,{
        method: 'GET',
        headers: {...Config.http.headers, 'Authorization': 'Bearer: ' + token.trim() }
      }).then((data) => {
        resolve(data)
      }).catch((error) => {
        reject(error)
      })
    })
  },

  fetchClass: (classId, token) => {
    return new Promise((resolve,reject) => {
      request('child/class/' + classId ,{
        method: 'GET',
        headers: {...Config.http.headers, 'Authorization': 'Bearer: ' + token.trim() }
      }).then((data) => {
        resolve(data)
      }).catch((error) => {
        reject(error)
      })
    })
  },

  submitAttendance: (location, centreId, classId, attendanceData, token) => {
    return new Promise((resolve,reject) => {
      const children = attendanceData.map((x,i) => ({
        children_id: x.id,
          latitude: location.coords.latitude.toString(),
          longitude: location.coords.longitude.toString(),
          attended: x.checked || false
      }))

      let jsonData = {
        centre_id: centreId,
        centre_class_id: classId,
        children: children
      }
      console.log('SUBMIT DATA',JSON.stringify(jsonData))
      request('attendance/bulk' ,{
        method: 'POST',
        body: JSON.stringify(jsonData),
        headers: {...Config.http.headers, 'Content-Type': 'application/json', 'Authorization': 'Bearer: ' + token.trim() }
      }).then((data) => {
        resolve(data)
      }).catch((error) => {
        reject(error)
      })
    })
  }
}


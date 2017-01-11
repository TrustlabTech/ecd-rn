/**
 * Early Childhood Development App
 * @copyright 2016 Global Consent Ltd
 * Civvals, 50 Seymour Street, London, England, W1H 7JG
 * @author Werner Roets <werner@io.co.za>
 */

import Config from './Config'
import Sentry from './Sentry'
import IMPLog from './Impulse/IMPLog'

function request(route, opts ) {
  options = opts || {method: 'GET'}
  if(Config.debug && Config.debugNetwork)

    IMPLog.networkRequest(options.method, new Date(), Config.http.baseUrl+route)
  else
    Sentry.addBreadcrumb('HTTP '+options.method,Config.http.baseUrl+route)

  return fetch(Config.http.baseUrl + route, options)

  // Response received
  .then( (response) => {

    if(Config.debug && Config.debugNetwork){
      IMPLog.networkResponse(response.status, new Date(),response._bodyText)
    } else {
      Sentry.addHttpBreadcrumb(Config.http.baseUrl + route, options.method, response.status)
    }

    return response.json()
  })

  .then((json) => {

    if(json.error) {
      return {error: json.error.toString()}

    } else {
      return json
    }
  })

  // On reject
  .catch( (error) => {

    if(Config.debug && Config.debugNetwork){
      IMPLog.error("API Error",error)
      return Promise.reject(error.toString())
    } else {
      return Promise.reject(error)
    }
  })

}

/** API functions avaialble to the App */
export default {

  /**
   * Log the user in and receive a token
   * @param {string} phoneNumber
   * @param {string} pin
   * @returns {undefined}
   */
  login: (phoneNumber, pin) => {
    const formData = new FormData()
    formData.append('username', phoneNumber)
    formData.append('password', pin)
    return request('staff/login',{
      body: formData,
      method: 'POST',
      headers: Config.http.headers
    })

  },

  fetchCentreSummary: (centreId, token) => {
    return request(`centre/${centreId}/summary`,{
      method: 'GET',
      headers: {...Config.http.headers, 'Authorization': 'Bearer: ' + token.trim() }
    })
  },

  fetchCentres: (token) => {
    return request('centre',{
      method: 'GET',
      headers: {...Config.http.headers, 'Authorization': 'Bearer: ' + token.trim() }
    })
  },


  fetchClasses: (staffId, token) => {
    return request('class/attendance/' + staffId,{
      method: 'GET',
      headers: {...Config.http.headers, 'Authorization': 'Bearer: ' + token.trim() }
    })
  },

  fetchClass: (classId, token) => {
    return request('child/class/' + classId ,{
      method: 'GET',
      headers: {...Config.http.headers, 'Authorization': 'Bearer: ' + token.trim() }
    })
  },

  fetchHistory: (centreId, year, month, token) => {
    return request(`attendance/${centreId}/history/${year}/${month}`, {
      method: 'GET',
      headers: {...Config.http.headers, 'Authorization': 'Bearer: ' + token.trim() }
    })
  },

  submitAttendance: (location, centreId, classId, attendanceData, token) => {

    const children = attendanceData.map((x,i) => ({
      children_id: x.id,
      latitude: location.coords.latitude.toString(),
      longitude: location.coords.longitude.toString(),
      attended: x.checked || false
    }))

    const jsonData = {
      centre_id: centreId,
      centre_class_id: classId,
      children: children
    }

    return request('attendance/bulk' ,{
      method: 'POST',
      body: JSON.stringify(jsonData),
      headers: {...Config.http.headers, 'Content-Type': 'application/json', 'Authorization': 'Bearer: ' + token.trim() }
    })

  },

  addChild: (givenName, familyName, idNumber, classId, token) => {
    console.log(classId)
    const jsonData = {
      given_name: givenName,
      family_name: familyName,
      id_number: idNumber,
      centre_class_id: classId
    }
    return request('child' ,{
      method: 'POST',
      body: JSON.stringify(jsonData),
      headers: {...Config.http.headers, 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token.trim() }
    })
  }

}

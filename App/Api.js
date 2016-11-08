import Config from './Config'

//
function request(route, options = {method: 'GET'} ) {
  console.log('API REQUEST',options)
  return fetch(Config.http.baseUrl + route, options)

  // Response received
  .then((response) => {
    console.log('API RESPONSE:',response)
    return response.json()
  })

  .then((json) => {
    // console.log('JSON RESPONSE', json)
    if(json.error) {
      if(json.error instanceof Array) {
        const errorMessage = ''
        json.error.forEach((item) => {
          errorMessage += item + "\n "
        })
        return { error: errorMessage.trim() }
      } else {
        return { error: json.error}
      }

    } else {
      return json
    }
  })

  // On reject
  .catch( (error) => {
    console.log('API:ERROR', error)
    if(Config.debug) return Promise.reject(error.toString())
    else return Promise.reject("A network error occured. Please check your connection.")
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
        console.log('API LOGIN 1')
        resolve(data)
      }).catch((error) => {
        console.log('API LOGIN CATCH')
        resolve({error: error})
      })
    })
  },

  register: (textFieldValues) => {

    return new Promise((resolve, reject) => {
      const formData = new FormData()
      formData.append('phone_number', textFieldValues['phoneNumber'])
      formData.append('password',textFieldValues['pin'])
      formData.append('password_confirmation',textFieldValues['pinConfirm'])

      formData.append('did','UNKNOWN')
      formData.append('za_id_number','9106275014085')
      formData.append('family_name', textFieldValues['lastName'])
      formData.append('given_name',textFieldValues['firstName'])
      formData.append('principle', 0)
      formData.append('practitioner', 0)
      formData.append('volunteer', 0)
      formData.append('cook', 0)
      formData.append('other',1)
      formData.append('registration_latitude','31.71291600')
      formData.append('registration_longitude','-168.07973000')
      formData.append('ecd_qualification_id',1)
      formData.append('centre_id',1)
      resolve(request('staff/register'))
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
        resolve({error: error})
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
        resolve({error: error})
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
        resolve({error: error})
      })
    })
  }
}

/*

function fetch(url, options) {

    return new Promise(function(resolve, reject) {
        var xhr = new XMLHttpRequest

        xhr.onload = function(e) {
            resolve({
                json: function() {
                    return new Promise(function(resolve2, reject2) {
                        var j
                        try {
                            j = JSON.parse(e.responseText)
                        } catch (e) {
                            return reject2(e)
                        }
                        return resolve2(j)
                    })
                }
            })
        }

        xhr.onerror = function(e) {
            return reject(e)
        }

        xhr.open(options.method, url, true, options.username, options.password)

        if (options.headers) {
            Object.keys(options.headers).forEach(function(key) {
                xhr.setRequestHeader(key, options.headers[key])
            })
        }

        xhr.send(options.body || null)
    })


}

*/
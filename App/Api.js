import Config from './Config'

function request(route, options = {method: 'GET'} ) {

  return fetch(Config.http.baseUrl + route, options)

  // Response received
  .then((response) => {
    return response.json()
  })

  .then((json) => {
    console.log('RESONSE JSON')
    if(json.error) {
      if(json.error instanceof Array) {
        const errorMessage = ''
        json.error.forEach((item) => {
          errorMessage += item + "\n "
        })
        return { error: errorMessage.trim() }
      }

    } else {
      return json
    }
  })

  // On reject
  .catch( (error) => {
    console.log('API:login', error)
    return Promise.reject(error.toString())
  })

}


export default {

  login: (phoneNumber, pin) => {
    return new Promise((resolve,reject) => {
      const formData = new FormData()
      formData.append('username', phoneNumber)
      formData.append('password', pin)
      resolve(request('staff/login',{
        formData: formData,
        method: 'POST'
      }))
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

  fetchCentres: () => {
    return new Promise((resolve,reject) => {
      resolve(request('centre'))
    })
  },


  fetchClasses: (centreId) => {
    return new Promise((resolve, reject) => {
      resolve(request('centre/'+centreId))
    })
  }
}
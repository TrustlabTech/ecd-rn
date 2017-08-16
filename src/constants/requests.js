/**
 * Early Childhood Development App
 * @copyright 2016 Global Consent Ltd
 * Civvals, 50 Seymour Street, London, England, W1H 7JG
 * @author Alberto Dallaporta <alberto.dallaporta@novalab.io>
 */

const DEFAULT_HEADERS = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
}

const
  API_SCHEMA = 'http',
  API_HOST = 'api.amply.tech',
  API_ROOT = `${API_SCHEMA}://${API_HOST}`,
  API_EIS_ROOT = `${API_ROOT}/eis`,
  API_CHILD_ROOT = `${API_ROOT}/child`,
  API_STAFF_ROOT = `${API_ROOT}/staff`,
  API_CLASS_ROOT = `${API_ROOT}/class`,
  API_ATTENDANCE_ROOT = `${API_ROOT}/attendance`

export const API_LOGIN = (body) => {
  return {
    url: `${API_STAFF_ROOT}/login`,
    options: {
      method: 'POST',
      headers: DEFAULT_HEADERS,
      body: JSON.stringify(body)
    }
  }
}

export const VERIFY_TOKEN = (token) => {
  return {
    url: `${API_STAFF_ROOT}/login`,
    options: {
      method: 'GET',
      headers: {
        ...DEFAULT_HEADERS,
        'Authorization': `Bearer ${token}`
      },
    }
  }
}

export const GET_CLASSES = (token, userid) => {
  return {
    url: `${API_CLASS_ROOT}/attendance/${userid}`,
    options: {
      method: 'GET',
      headers: {
        ...DEFAULT_HEADERS,
        'Authorization': `Bearer ${token}`
      }
    }
  }
}

export const GET_CHILDREN = (token, classid) => {
  return {
    url: `${API_CHILD_ROOT}/class/${classid}`,
    options: {
      method: 'GET',
      headers: {
        ...DEFAULT_HEADERS,
        'Authorization': `Bearer ${token}`
      }
    }
  }
}

export const VERIFY_DID = (token, did) => {
  return {
    url: `${API_EIS_ROOT}/${did}`,
    options: {
      method: 'GET',
      headers: {
        ...DEFAULT_HEADERS,
        'Authorization': `Bearer ${token}`
      }
    }
  }
}

export const CREATE_CHILD = (token, body) => {
  return {
    url: `${API_CHILD_ROOT}`,
    options: {
      method: 'POST',
      headers: {
        ...DEFAULT_HEADERS,
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(body)
    }
  }
}

export const UPDATE_CHILD_CLASS = (token, childid, body) => {
  return {
    url: `${API_CHILD_ROOT}/${childid}`,
    options: {
      method: 'PATCH',
      headers: {
        ...DEFAULT_HEADERS,
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(body)
    }
  }
}

export const SUBMIT_ATTENDANCE = (token, body) => {
  return {
    url: `${API_ATTENDANCE_ROOT}/bulk`,
    options: {
      method: 'POST',
      headers: {
        ...DEFAULT_HEADERS,
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(body)
    }
  }
}

export const SUBMIT_ATTENDANCE_CLAIMS = (token, body) => {
  return {
    url: `${API_ATTENDANCE_ROOT}/claims`,
    options: {
      method: 'POST',
      headers: {
        ...DEFAULT_HEADERS,
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(body)
    }
  }
}

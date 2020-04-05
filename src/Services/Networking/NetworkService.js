/* eslint-disable prefer-promise-reject-errors */
import axios from 'axios'
import reactotron from 'reactotron-react-native'

export const GET = (endpoint, token = null, search = false) => requestWithAxios('GET', endpoint, null, token)

export const POST = (endpoint, params, token = {}, headers) => requestWithAxios('POST', endpoint, params, token, headers)

export const PUT = (endpoint, params, token = null) => requestWithAxios('PUT', endpoint, params)

export const DELETE = (endpoint, params, token = null) => requestWithAxios('DELETE', endpoint, params)

const requestWithAxios = (method, url, params, { basic_token, bearer_token }, headers) => new Promise((resolve, reject) => {
  const options = {
    method,
    url,
  }
  if (params) { options.data = JSON.stringify(params) }
  if (headers) { options.headers = { ...headers } }
  if (bearer_token) { options.headers.Authorization = `Bearer ${bearer_token}` } else if (basic_token) { options.headers.Authorization = `Basic ${basic_token}` }
  reactotron.log('axios params: ', options)

  axios(options)
    .then((response) => {
      resolve({ statusCode: response.status, body: response.data })
    })
    .catch((error) => {
      if (error.response !== undefined) {
        resolve({ statusCode: error.response.status, body: error.response.data })
      } else {
        // eslint-disable-next-line prefer-promise-reject-errors
        reject({ statusCode: 999, body: { message: 'Cannot connect to server. Please check your internet connection and retry' } })
      }
    })
})

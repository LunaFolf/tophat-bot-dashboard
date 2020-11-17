import axios from 'axios'

const apiBaseUrl = process.env.VUE_APP_jax_api_url
const clientToken = process.env.VUE_APP_jax_client_token

const api = {
  URL (url) {
    return url.startsWith('http') ? url : apiBaseUrl + url
  },
  get (url, options = {}) {
    var headers = options.headers || {}
    if (api.URL(url).includes(apiBaseUrl)) headers['jax-client-token'] = clientToken
    return axios.get(api.URL(url), { headers })
  },
  post (url, data, options = {}) {
    var headers = options.headers || {}
    if (api.URL(url).includes(apiBaseUrl)) headers['jax-client-token'] = clientToken
    return axios.post(api.URL(url), data, { headers })
  }
}

export default api

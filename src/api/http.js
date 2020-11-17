const apiBaseUrl = process.env.VUE_APP_jax_api_url
const clientToken = process.env.VUE_APP_jax_client_token

const api = {
  URL (url) {
    return new URL(url.startsWith('http') ? url : apiBaseUrl + url)
  },
  get (url, options = {}) {
    var headers = options.headers || {}
    return httpRequest(api.URL(url), { headers })
  },
  post (url, data, options = {}) {
    var headers = options.headers || {}
    return httpRequest(api.URL(url), {
      body: data instanceof FormData ? data : JSON.stringify(data),
      headers
    })
  }
}

async function httpRequest (url, config = {}) {
  let requestOptions = {
    method: config.method || 'GET',
    headers: {
      ...config.headers
    }
  }
  if (url.href.includes(apiBaseUrl)) requestOptions.headers['jax-client-token'] = clientToken

  if (config.body) {
    if (!(config.body instanceof FormData)) {
      requestOptions.headers['Content-Type'] = 'application/json'
    }
    requestOptions.body = config.body
  }

  return fetch(url, requestOptions)
    .then(async res => {
      return res.json().then(json => {
        return res.ok ? json : Promise.reject(json)
      })
    })
}

export default api

const apiBaseUrl = process.env.VUE_APP_jax_api_url
// const clientToken = process.env.VUE_APP_jax_client_token

const api = {
  URL (url) {
    console.log(url)
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

function httpRequest (url, config = {}) {
  console.log(url)
  let requestOptions = {
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'omit',
    method: config.method || 'GET',
    headers: {
      Origin: url.origin,
      ...config.headers
    }
  }
  // if (url.href.includes(apiBaseUrl)) requestOptions.headers['jax-client-token'] = clientToken

  if (!(config.body instanceof FormData)) {
    requestOptions.headers['Content-Type'] = 'application/json'
  }

  if (config.body) requestOptions.body = config.body

  console.log(requestOptions)

  return fetch(url, requestOptions)
}

export default api

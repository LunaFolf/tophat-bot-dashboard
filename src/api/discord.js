import http from './http.js'

export function getUser (access_token) {
  return http.get('https://discord.com/api/v8/users/@me', {
    headers: { "Authorization": "Bearer " + access_token }
  })
}

export function postOauth (data) {
  const formData = new FormData();
  for (var key in data) {
    formData.append(key, data[key])
  }
  return http.post('https://discord.com/api/v8/oauth2/token', formData, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" }
  })
}

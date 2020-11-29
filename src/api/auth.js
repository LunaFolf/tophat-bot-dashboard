import http from './http.js'

export function auth () {
  return http.get('/authenticate')
}

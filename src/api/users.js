import http from './http.js'

export function get () {
  return http.get('/users')
}

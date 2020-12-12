import http from './http.js'

export function get (id) {
  return http.get('/users' + (id ? `/${id}` : ''))
}

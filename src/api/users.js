import http from './http.js'

export function get (id, filters) {
  return http.get('/users' + (id ? `/${id}` : '') + (filters ? `?${http.serialize(filters)}` : ''))
}

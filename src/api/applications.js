import http from './http.js'

export function get () {
  return http.get('/applications')
}

export function getTypes () {
  return http.get('/applications/types')
}

export function submit (data) {
  return http.post('/applications', data)
}

export function review (id, data) {
  return http.post(`/applications/${id}`, data)
}

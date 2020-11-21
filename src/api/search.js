import http from './http.js'

export function search (query) {
  return http.get(`/search?query=${query}`)
}

import request from 'superagent'

const rootUrl = 'http://localhost:3333/api/V1'

export function getAllUsers () {
  return request.get(rootUrl + '/users')
    .then(res => {
      return res.body.users
    })
}

export function getUser (id) {
  const reqStr = `/users/${id}`
  return request.get(rootUrl + reqStr)
    .then(res => {
      return res.body.user
    })
}

export function addUser (userData) {
  request
    .post(rootUrl + '/users')
    .send(userData)
    .end()
}

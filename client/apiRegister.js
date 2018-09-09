import request from 'superagent'

const rootUrl = 'http://localhost:3333/api/v1/register'

export function addUser (user) {
  return request
    .post(rootUrl + '/addUser')
    .send({user})
      .then(res => {
        return {
          success: res.status == 201 ? true : false,
          message: res.body
        }
      })
}

export function getUser (id) {
  const reqStr = `/users/${id}`
  return request.get(rootUrl + reqStr)
    .then(res => {
      return res.body.user
    })
}

export function registerUser (userData) {
  request
    .post(rootUrl + '/users')
    .send(userData)
    .end()
}

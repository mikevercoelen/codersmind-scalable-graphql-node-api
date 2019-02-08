const expect = require('expect')
const { request } = require('../../utils/test')

const testUser = {
  email: 'test-user@gmail.com',
  password: 'test1234',
  firstName: 'test',
  lastName: 'user'
}

const signup = ({ email, password, firstName, lastName }, returnValues = `{
  id
  email
}`) => {
  return request({
    query: `
      mutation {
        signup(
          email: "${email}",
          password: "${password}",
          firstName: "${firstName}",
          lastName: "${lastName}"
        ) ${returnValues}
      }
    `
  })
}

describe('auth', () => {
  describe('sign up', () => {
    it('should create a new user', () => {
      return signup(testUser)
        .expect(res => {
          expect(res.body).toHaveProperty('data.signup.id')
          expect(res.body).toHaveProperty('data.signup.email', testUser.email)
        })
        .expect(200)
    })

    it('should not create a new user when a password is missing', () => {
      return signup({
        ...testUser,
        password: null
      })
        .expect(res => {
          expect(res.body).toHaveProperty('errors')
          expect(Array.isArray(res.body.errors)).toBe(true)
        })
    })

    it('should not create a new user with the same email', () => {
      return signup(testUser)
        .expect(res => {
          expect(res.body).toHaveProperty('errors')
          expect(Array.isArray(res.body.errors)).toBe(true)
        })
    })
  })

  describe('login', () => {
    it('should succesfully login and return a token', () => {
      return request({
        query: `
          mutation {
            login(email:"${testUser.email}", password:"${testUser.password}") {
              user {
                id
              }
              token
              tokenExpiration
            }
          }
        `
      })
        .expect(res => {
          expect(res.body).toHaveProperty('data.login.user.id')
          expect(res.body).toHaveProperty('data.login.token')
          expect(res.body).toHaveProperty('data.login.tokenExpiration')
        })
        .expect(200)
    })
  })

  describe('me', () => {
    let loginResponse = null

    before(async () => {
      await request({
        query: `
          mutation {
            login(email:"${testUser.email}", password:"${testUser.password}") {
              user {
                id
              }
              token
              tokenExpiration
            }
          }
        `
      })
        .expect(res => {
          expect(res.body).toHaveProperty('data.login.user.id')
          expect(res.body).toHaveProperty('data.login.token')
          expect(res.body).toHaveProperty('data.login.tokenExpiration')

          loginResponse = res.body
        })
        .expect(200)
    })

    it('should not return a profile when not logged in', () => {
      return request({
        query: `
          query me {
            me {
              id
              email
              firstName
              lastName
            }
          }
        `
      })
        .expect(res => {
          expect(res.body).toHaveProperty('errors')
          expect(res.body.data.me).toEqual(null)
          expect(Array.isArray(res.body.errors)).toBe(true)
        })
    })

    it('should succesfully return the profile from me', () => {
      const token = loginResponse.data.login.token

      return request({
        query: `
          query me {
            me {
              id
              email
              firstName
              lastName
            }
          }
        `
      })
        .set('x-token', token)
        .expect(res => {
          expect(res.body).toHaveProperty('data.me.id')
          expect(res.body).toHaveProperty('data.me.email', testUser.email)
          expect(res.body).toHaveProperty('data.me.firstName', testUser.firstName)
          expect(res.body).toHaveProperty('data.me.lastName', testUser.lastName)
        })
        .expect(200)
    })
  })
})

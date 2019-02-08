const me = require('./me')
const login = require('./login')
const signup = require('./signup')

const resolvers = {
  Query: {
    me
  },
  Mutation: {
    login,
    signup
  }
}

module.exports = resolvers

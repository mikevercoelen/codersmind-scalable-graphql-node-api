const isAuthenticated = require('./is-authenticated')

module.exports = {
  typeDefs: [
    isAuthenticated.typeDef
  ],
  schemaDirectives: {
    isAuthenticated: isAuthenticated.directive
  }
}

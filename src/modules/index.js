const { makeExecutableSchemaFromModules } = require('../utils/modules')

const auth = require('./auth')
const books = require('./books')

module.exports = makeExecutableSchemaFromModules({
  modules: [
    auth,
    books
  ]
})

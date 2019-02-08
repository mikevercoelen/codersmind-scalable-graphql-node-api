const DateTime = require('./date-time')

module.exports = {
  typeDefs: [
    DateTime.typeDef
  ],
  resolvers: {
    ...DateTime.resolvers
  }
}

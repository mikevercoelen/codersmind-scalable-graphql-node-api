const { GraphQLScalarType, Kind } = require('graphql')
const { gql } = require('apollo-server-express')

const typeDef = gql`
  scalar DateTime
`

const DateTime = new GraphQLScalarType({
  name: 'DateTime',
  description: 'A DateTime representation in ISO format',
  parseValue (value) {
    return value
  },
  serialize (value) {
    return value
  },
  parseLiteral (ast) {
    if (ast.kind === Kind.INT) {
      return new Date(ast.value)
    }

    return null
  }
})

module.exports = {
  typeDef,
  resolvers: {
    DateTime
  }
}

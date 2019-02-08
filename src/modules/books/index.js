const { gql } = require('apollo-server-express')

const typeDefs = gql`
  extend type Query {
    book(id: ID!): Book @isAuthenticated
    books: [Book] @isAuthenticated
  }

  extend type Mutation {
    createBook(
      title: String!
    ): Book
  }
  
  type Book {
    id: ID!
    title: String!
    createdBy: User!
    created: DateTime!
  }
`

const resolvers = require('./resolvers')

module.exports = {
  typeDefs: [
    typeDefs
  ],
  resolvers
}

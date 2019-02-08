const book = require('./book')
const books = require('./books')
const createBook = require('./create-book')

const resolvers = {
  Query: {
    book,
    books
  },
  Mutation: {
    createBook
  }
}

module.exports = resolvers

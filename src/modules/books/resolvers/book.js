const { ApolloError } = require('apollo-server-express')
const Book = require('../../../models/book')

const book = async (_, args) => {
  const { id } = args
  const book = await Book
    .findById(id)
    .populate('createdBy')

  if (!book) {
    throw new ApolloError('Not found')
  }

  return book
}

module.exports = book

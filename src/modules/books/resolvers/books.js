const Book = require('../../../models/book')

const books = async (_) => {
  const books = await Book
    .find()
    .populate('createdBy')

  return books
}

module.exports = books

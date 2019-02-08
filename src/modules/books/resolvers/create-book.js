const Book = require('../../../models/book')

const createBook = async (_, {
  title
}, { user }) => {
  const userId = user._id.toString()

  const newBook = new Book({
    title,
    createdBy: userId
  })

  await newBook
    .populate('createdBy')
    .execPopulate()

  return newBook.save()
}

module.exports = createBook

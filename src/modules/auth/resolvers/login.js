const { AuthenticationError } = require('apollo-server-express')
const tokenUtil = require('../../../utils/token')
const User = require('../../../models/user')
const bcrypt = require('bcrypt')
const config = require('../../../config')

const login = async (_, { email, password }) => {
  const user = await User.findOne({
    email
  })

  if (!user) {
    throw new AuthenticationError('User not found')
  }

  const isPasswordValid = await bcrypt.compare(password, user.hashedPassword)

  if (!isPasswordValid) {
    throw new AuthenticationError('Incorrect password')
  }

  const token = tokenUtil.create(user._id)

  return {
    user: {
      ...user._doc,
      id: user._id
    },
    token,
    tokenExpiration: config.JWT_LIFE_TIME
  }
}

module.exports = login

const tokenUtil = require('./token')
const User = require('../models/user')

const TOKEN_HEADER_NAME = 'x-token'

const getUser = async req => {
  if (!req) {
    return null
  }

  const tokenHeader = req.get(TOKEN_HEADER_NAME)

  if (!tokenHeader) {
    return null
  }

  try {
    const decodedToken = await tokenUtil.getDecodedToken(tokenHeader)
    return await User.findById(decodedToken.userId)
  } catch (error) {
    return null
  }
}

module.exports = {
  getUser
}

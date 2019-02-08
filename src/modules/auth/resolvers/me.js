const me = async (_, args, { user }) => ({
  ...user._doc,
  id: user.id
})

module.exports = me

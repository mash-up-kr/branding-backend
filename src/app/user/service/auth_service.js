const User = require('../domain/user.js');
const jwt = require('../../../common/auth/jwt.js');
const HttpError = require('http-errors');

const signIn = async (userId, password) => {
  const user = await User.findOne({
    where: {
      user_id : userId,
    },
  });

  if(!user) {
    throw HttpError(400, 'Check Id or Password');
  }

  if(!await user.equalsPassword(password)) {
    throw HttpError(400, 'Check Id or Password');
  }

  const token = jwt.sign(user.id, user.user_id, user.role);

  return token;
};

module.exports = {
  signIn,
};

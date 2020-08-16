const User = require('../domain/user.js');
const jwt = require('../../../util/jwt.js');

async function signIn(userId, password) {
    const user = await User.findOne({
      where: {
        user_id : userId,
      },
    });
``
    if(!user) {
      const error = new Error('Check Id or Password');
      error.status = 400;
      throw error;
    }

    if(!await user.equalsPassword(password)) {
      const error = new Error('Check Id or Password');
      error.status = 400;
      throw error;
    }

    const token = jwt.sign(user.id, user.user_id, user.role);
    return token;
}

export {
  signIn
}

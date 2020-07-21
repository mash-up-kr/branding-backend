import User from '../models/user';

async function signIn(userId, password) {
    const user = await User.findOne({
      where: {
        user_id : userId,
      },
    });
    return await user.equalsPassword(password);
}

export {
  signIn
}
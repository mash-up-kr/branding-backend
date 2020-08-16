const authService = require('../../service/auth_service.js');

const signIn = async (req, res, next) => {
  const { userId, password } = req.body;
  try {
    const resultToken = await authService.signIn(userId, password);
    res.status('200')
    .json({
      success: true,
      message: { token : resultToken }
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

module.exports = {
  signIn,
};

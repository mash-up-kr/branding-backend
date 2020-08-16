const Jwt = require('jsonwebtoken');
const Util = require('util');
const JwtConfig = require('../../config/jwt-config.json');

const jwtSign = Util.promisify(Jwt.sign);
const jwtVerify = Util.promisify(Jwt.verify);

const sign = async (id, userId, role) => {
  try {
    const userInfo = {id: id, user_id: userId, role: role};
    const secretKey = JwtConfig.secret;
    const options = {expiresIn: '365d', issuer: 'mash-up.com', subject: 'userInfo'};
    const result = await jwtSign(userInfo, secretKey, options);

    return result;
  } catch (err) {
    const error = new Error('Fail Auth - Cannot make Token');
    error.status = 400;
    throw error;
  }
};

const verify = async token => {
  try {
    return await jwtVerify(token, JwtConfig.secret);
  } catch (err) {
    const error = new Error('Fail Auth - Cannot Authenticate');
    error.status = 400;
    throw error;
  }
};

module.exports = {
  sign,
  verify,
};

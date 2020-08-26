const Jwt = require('jsonwebtoken');
const Util = require('util');
const JwtConfig = require('../../../config/jwt-config.json');

const jwtSign = Util.promisify(Jwt.sign);
const jwtVerify = Util.promisify(Jwt.verify);
const BEARER_INDEX = 7;
const BEARER = 'Bearer ';
const ONE_YEAR = '365d';
const ISSUER = 'mash-up.com';
const SBUJECT = 'userInfo';

const sign = async (id, userId, role) => {
  try {
    const userInfo = {id: id, user_id: userId, role: role};
    const secretKey = JwtConfig.secret;
    const options = {expiresIn: ONE_YEAR, issuer: ISSUER, subject: SBUJECT};
    const result = await jwtSign(userInfo, secretKey, options);
    return result;
  } catch (err) {
    const error = new Error('Fail Auth - Cannot make Token');
    error.status = 400;
    throw error;
  }
};

const verify = async (token) => {
  if (!token || !(await isBearer(token))) {
    throw new Error(`Invalid bearer format`);
  }
  try {
    const typeCutToken = token.substring(BEARER_INDEX);
    return await jwtVerify(typeCutToken, JwtConfig.secret);
  } catch (err) {
    const error = new Error('Fail Auth - Cannot Authenticate');
    error.status = 400;
    throw error;
  }
};

const isBearer = async (token) => {
  return token.startsWith(BEARER);
};

module.exports = {
  sign,
  verify,
};

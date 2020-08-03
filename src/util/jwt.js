const Jwt = require('jsonwebtoken');
const Util = require('util');
const JwtConfig = require('../../config/jwt-config.json');

const jwtSign = Util.promisify(Jwt.sign);
const jwtVerfy = Util.promisify(Jwt.verify);

async function sign(id, userId, role) {
  try {
    return await jwtSign({ id: id, user_id: userId, role: role}, 
                        JwtConfig.secret, 
                   { expiresIn: '365d', issuer: 'mash-up.com', subject: 'userInfo'});
  } catch (err) {
    const error = new Error('Fail Auth - Cannot make Token');
    error.status = 400;
    throw error;
  }
}

async function verfy(token) {
  try {
    return await jwtVerfy(token, JwtConfig.secret);
  } catch (err) {
    const error = new Error('Fail Auth - Cannot Authenticate');
    error.status = 400;
    throw error;
  }
}

export {
  sign, 
  verfy
}

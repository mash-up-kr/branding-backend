const Jwt = require('../../util/jwt.js');
const JwtConfig = require('../../../config/jwt-config.json');

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization;
  
  if(!token) {
      return res.status(403).json({
          success: false,
          message: 'No Atuthentification - Check Token'
      })
  }

  try {
      const decoded = await Jwt.verify(token);
      req.decoded = decoded;
      next(); 
    
    } catch (err) {
      return  res.status(403).json({
          success: false,
          message: 'No Atuthentification - Check Token'
      })
  }
};

module.exports = authMiddleware;

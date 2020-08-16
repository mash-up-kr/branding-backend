const crypto = require('crypto');
const util = require('util');

const pbkdf2Promise = util.promisify(crypto.pbkdf2);

const equalsEncryption = async (password, inputPassword) => {
	const array = password.split('$');
	const salt = array[0];
	const userPassword = array[1];
	const inputKey =  await pbkdf2Promise(inputPassword, salt, 100, 64, "sha512");

	return userPassword == inputKey.toString("base64");
};

module.exports = {
	equalsEncryption,
};

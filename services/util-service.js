const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {
	async hashPassword(password) {
		try {
			return await bcrypt.hash(password, saltRounds);
		} catch (err) {
			throw err;
		}
	},

	async comparedPassword(password, hash) {
		try {
			return await bcrypt.compare(password, hash);
		} catch (err) {
			throw err;
		}
	},
};

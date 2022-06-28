const admin = require('./firebaseServiceAccount');
class Authentication {
	async decodeToken(req, res, next) {
		const token = req.headers.authorization;
		try {
			const decodeValue = await admin.auth().verifyIdToken(token);
			console.log(decodeValue);
			if (decodeValue) {
				req.user = decodeValue;
				next();
			}
			return res.json({ message: 'Un authorize' });
		} catch (e) {
			return res.json({ message: 'internal error' });
		}
	}
}

module.exports = new Authentication();
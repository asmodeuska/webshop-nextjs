const express = require("express");
require('dotenv').config()
const app = express();
const cors = require("cors");
const port = 5000;
const admin = require('./firebaseServiceAccount');

app.use(cors());
app.use(express.json());


app.post('/api/authentication', async(req, res) => {
	const idToken = req.headers.token;
	const claims = await admin.auth().verifyIdToken(idToken);
	if (
		claims.uid === process.env.FIREBASE_ADMIN_UID
	) {
		// Add custom claims for additional privileges.
		await admin.auth().setCustomUserClaims(claims.sub, {
			admin: true
		});

		// Tell client to refresh token on user.
		res.end(JSON.stringify({
			status: 'success'
		}));
	} else {
		// Return nothing.
		res.end(JSON.stringify({ status: 'ineligible' }));
	}
});



app.listen(port, () => {
	console.log(`Server is running on port: ${port}`);
});
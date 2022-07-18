const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccount.json");
const { mongo_connection } = require('../middleware/mongo');
const productSchema = require('../schemas/productSchemas');

admin.initializeApp({
  credential: admin.credential.cert(
    {
      "type": "service_account",
      "project_id": "eshop-3b7c4",
      "private_key_id": process.env.FIREBASE_PRIVATE_KEY_ID,
      "private_key": process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      "client_email": process.env.FIREBASE_CLIENT_EMAIL,
      "client_id": process.env.FIREBASE_CLIENT_ID,
      "auth_uri": "https://accounts.google.com/o/oauth2/auth",
      "token_uri": "https://oauth2.googleapis.com/token",
      "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
      "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-zzpe5%40eshop-3b7c4.iam.gserviceaccount.com"
    }
  ),
  databaseURL: "https://eshop-3b7c4-default-rtdb.europe-west1.firebasedatabase.app"
});

const authenticate = async (req, res, next) => {
  try {
    const idToken = req.headers.token;
    await admin.auth().verifyIdToken(idToken).then(decodedToken => {

      if (decodedToken.uid === process.env.FIREBASE_ADMIN_UID) {
        return next();
      } else {
        console.log('Unauthorized');
        res.status(401).send();
      }
    }).catch(err => {
      return res.status(401);
    }
    );
  }
  catch (err) {
    return res.status(401);
  }
}

const login = async (req, res) => {
  try {
    const idToken = req.headers.token;
    await admin.auth().verifyIdToken(idToken).then(decodedToken => {
      const uid = decodedToken.uid;
      const User = mongo_connection.model('users', productSchema.userSchema);
      User.findOne({ uid: uid }, (err, user) => {
        console.log(user);
        if (user === null) {
          User.create({ uid: uid }, (err, user) => {
            if (err) {
              return res.status(500).send();
            }
            else {
              return res.status(200).send();
            }
          });
        } else {
          return res.status(200).send();
        }
      });
    });
  }
  catch (err) {
    return res.status(401);
  }
}


module.exports = {
  authenticate,
  login
}
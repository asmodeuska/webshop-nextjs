const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccount.json");
const { mongo_connection } = require('../middleware/mongo');
const productSchema = require('../schemas/productSchemas');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
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
        if (user===null) {
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
var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccount.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://eshop-3b7c4-default-rtdb.europe-west1.firebasedatabase.app"
});
module.exports = admin;
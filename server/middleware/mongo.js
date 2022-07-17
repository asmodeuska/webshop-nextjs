const mongoose = require('mongoose');

const mongo_connection = mongoose.createConnection(process.env.MONGO_URI);
/*const mongoose_users = mongoose.createConnection(process.env.MONGO_USERS_URI);
const mongoose_payments = mongoose.createConnection(process.env.MONGO_PAYMENTS_URI);
const mongoose_orders = mongoose.createConnection(process.env.MONGO_ORDERS_URI);*/

module.exports = {
    mongoose,
    mongo_connection,
   // mongoose_users,
    //mongoose_payments,
    //mongoose_orders
}
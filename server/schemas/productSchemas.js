const { mongoose } = require('../middleware/mongo');

const userSchema = new mongoose.Schema({
    uid: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});


const attributeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
});


const sizeSchema = new mongoose.Schema({
    height: Number,
    length: Number,
    width: Number
});

const ratingSchema = new mongoose.Schema({
    value: {
        type: Number
    },
    review: {
        type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});


const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
    },
    brand:{
        type: String,
        required: true
    },
    attributes: [{
        name: {
            type: String,
            required: true
        },
        value: {
            type: String,
            required: true
        }
    }],
    image : Buffer,
    ratings: [
        ratingSchema
    ]
});



const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'categories',
        default: null
    },
    attributes: {
        type: [String],
    }
});

module.exports = {
    itemSchema,
    categorySchema,
    attributeSchema,
    userSchema
}

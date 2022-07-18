const { mongo_connection } = require('../middleware/mongo');
const productSchema = require('../schemas/productSchemas');
const slugify = require('slugify');
fs = require('fs');

const addItem = async (req, res) => {
    const Item = mongo_connection.model('products', productSchema.itemSchema);
    let attrs = JSON.parse(req.body.attributes)
    let data = {
        name: req.body.name,
        description: req.body.description,
        brand: req.body.brand,
        price: req.body.price,
        category: req.body.category,
        attributes: attrs,
        image: req.file.buffer,
        price: req.body.price,
        slug: slugify(req.body.name, { lower: true }),
    };
    Item.create(data, (err, data) => {
        if (err) {
            res.status(500).send();
            return;
        } else {
            console.log("siker");
            res.status(200).send();
            return;
        }
    });
}

const search = async (req, res) => {
    const Item = mongo_connection.model('products', productSchema.itemSchema);
    let query = req.params.q;
    console.log(query);
    Item.find( {$or: [
        {name: { $regex: query, $options: "i"}},
        {description: { $regex: query, $options: "i"}},
        {category: { $regex: query, $options: "i"}},
        {brand: { $regex: query, $options: "i"}},
         ],}, (err, data) => {
        console.log(err);
        if (err) {
            res.status(600).send();
            return;
        } else {
            res.status(200).send(data);
            return;
        }
    }
    );
}

const getItems = async (req, res) => {
    const Item = mongo_connection.model('products', productSchema.itemSchema);
    Item.find({}, (err, item) => {
        if (err) {
            res.status(500);
            return;
        } else {
            res.status(200).json(item);
            return;
        }
    }
    );
}
const getItem = async (req, res) => {
    if(!req.params.slug){
        res.status(400).send();
        return;
    }
    const Item = mongo_connection.model('products', productSchema.itemSchema);
    Item.find({ slug : {$regex: `${req.params.slug}`}}, (err, item) => {
        if (err) {
            res.status(500);
            return;
        } else {
            res.status(200).json(item);
            return;
        }
    }
    );
}


const addCategory = async (req, res, next) => {
    const Category = mongo_connection.model('categories', productSchema.categorySchema);
    Category.create(req.body, (err, category) => {
        if (err) {
            res.status(500).send();
            return;
        } else {
            res.status(200).send();
            return;
        }
    }
    );
}

const deleteCategory = async (req, res, next) => {
    const Category = mongo_connection.model('categories', productSchema.categorySchema);
    Category.deleteOne(req.body[0], (err, category) => {
        if (err) {
            res.status(500).send();
            return;
        } else {
            res.status(200).send();
            return;
        }
    }
    );
}

const getCategories = async (req, res) => {
    const Category = mongo_connection.model('categories', productSchema.categorySchema);
    Category.find({}, (err, categories) => {
        if (err) {
            res.status(500);
            return;
        } else {
            res.status(200).json(categories);
            return;
        }
    }
    );
}
const getCategory = async (req, res) => {
    const Category = mongo_connection.model('categories', productSchema.categorySchema);
    Category.findOne({ _id: req.params.id }, (err, category) => {
        if (err) {
            res.status(500);
            return;
        } else {
            res.status(200).json(category);
            return;
        }
    }
    );
}


const addAttributes = async (req, res) => {
    const Attribute = mongo_connection.model('attributes', productSchema.attributeSchema);
    Attribute.insertMany(req.body, (err, attribute) => {
        if (err) {
            console.log(err);
            res.status(500).send();
            return;
        } else {
            console.log("siker");
            res.status(200).send();
            return;
        }
    }
    );
}

const deleteAttributes = async (req, res) => {
    const Attribute = mongo_connection.model('attributes', productSchema.attributeSchema);
    Attribute.deleteMany({name : {$in: req.body}} , (err, attribute) => {
        if (err) {
            console.log(err);   
            res.status(500).send();
            return;
        } else {
            res.status(200).send(attribute.deletedCount.toString());
            return;
        }
    }
    );
}

const getAttributes = async (req, res) => {
    const Attribute = mongo_connection.model('attributes', productSchema.attributeSchema);
    Attribute.find({}, (err, attributes) => {
        console.log(attributes);
        if (err) {
            res.status(500);
            return;
        } else {
            res.status(200).json(attributes);
            return;
        }
    }
    );
}

const updateCategory = async (req, res) => {
    const Category = mongo_connection.model('categories', productSchema.categorySchema);
    Category.updateOne({ name: req.body[0].name }, { $set: req.body[1].attr }, (err, category) => {
        if(err){
            res.status(500).send();
            return;
        }
        else{
            res.status(200).send();
            return;
        }
    })
}



const getAttributesByCategory = async (req, res) => {
    const Category = mongo_connection.model('categories', productSchema.categorySchema);
    Category.find({ name: req.body.category }, (err, attributes) => {
        if (err) {
            res.status(500).send();
            return;
        } else {
            console.log(attributes);
            res.status(200).json(attributes);
            return;
        }
    }
    );
}

const addRating = async (req, res) => {
    const Item = mongo_connection.model('products', productSchema.itemSchema);
    console.log(req.body);
    Item.updateOne({ _id: req.body.id }, { $push: { ratings: req.body.rating } }, (err, item) => {
        if (err) {
            console.log(err);
            res.status(500).send();
            return;
        } else {
            res.status(200).send();
            return;
        }
    }
    );
}

module.exports = {
    addItem,
    getItems,
    addCategory,
    deleteCategory,
    getCategories,
    addAttributes,
    deleteAttributes,
    getAttributes,
    getItem,
    getCategory,
    getAttributesByCategory,
    updateCategory,
    addRating,
    search
}
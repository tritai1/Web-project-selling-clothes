const mongoose = require("mongoose");
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);

const productSchema = new mongoose.Schema({

        title: String,
        description: String,
        price: Number,
        discountPercentage: Number,
        stock: Number,
        thumbnail: String,
        status: String,
        position: Number,
        slug:  { type: String,
                 slug: "title",
                 unique: true 
                },
        deleted: {
                type: Boolean,
                default: false
        },
        deletyedAt: Date
    
})

const ProductPage = mongoose.model("ProductPage", productSchema, "product-2");

module.exports = ProductPage;
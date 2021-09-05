const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const shortid = require("shortid");

const app = express();
app.use(bodyParser.json());
mongoose.connect(
    process.env.MONGODB_URL || "mongodb://localhost/react-shopping-cart-db",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
);

const Product = mongoose.model(
    "products",
    new mongoose.Schema({
        _id: { type: String, default: shortid.generate },
        title: String,
        description: String,
        image: String,
        price: Number,
        availableSizes: [String],
    })
);

app.get("/api/products", async (req, res) => {
    const products = await Product.find({});
    res.send(products);
});

app.post("/api/products", async (req, res) => {
    const newProduct = new Product(req.body);
    const saveProduct = await newProduct.save();
    res.send(saveProduct)
});

app.delete("/api/products/:id", async (res, req) => {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    res.send(deletedProduct);
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log("serve at http://localhost:5000"));

console.log(mongoose.version);
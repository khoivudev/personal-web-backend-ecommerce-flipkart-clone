var Product = require("../models/product");
var shortid = require("shortid");
var slugify = require("slugify");

exports.createProduct = (req, res) => {
  const { name, price, description, category, quantity } = req.body;

  let productPictures = [];
  if (req.files.length > 0) {
    productPictures = req.files.map((file) => {
      return { img: file.filename };
    });
  }

  const product = new Product({
    name,
    slug: slugify(name),
    price,
    quantity,
    description,
    productPictures,
    category,
    createBy: req.user._id,
  });

  product
    .save()
    .then((product) => {
      res.status(201).json({ product });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

exports.getProducts = (req, res, next) => {
  Product.find({})
    .then((products) => {
      res.status(200).json({ products });
    })
    .catch((error) => {
      return res.status(400).json({ error });
    });
};

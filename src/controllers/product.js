var Product = require("../models/product");
var Category = require("../models/category");
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
    slug: `${slugify(name)}-${shortid.generate()}`,
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

exports.getProducts = (req, res) => {
  Product.find({})
    .then((products) => {
      res.status(200).json({ products });
    })
    .catch((error) => {
      return res.status(400).json({ error });
    });
};

exports.getProductsByCategorySlug = (req, res) => {
  const { category_slug } = req.params;
  Category.findOne({ slug: category_slug })
    .select("_id")
    .exec((error, category) => {
      if (error) {
        return res.status(400).json({ error });
      }
      if (category) {
        Product.find({ category: category._id }).exec((error, products) => {
          if (error) {
            return res.status(400).json({ error });
          }
          if (products.length > 0)
            return res.status(200).json({
              products,
              productsByPrice: {
                under5k: products.filter((product) => product.price <= 5000),
                under10k: products.filter(
                  (product) => product.price > 5000 && product.price <= 10000
                ),
                under15k: products.filter(
                  (product) => product.price > 10000 && product.price <= 15000
                ),
                under20k: products.filter(
                  (product) => product.price > 15000 && product.price <= 20000
                ),
                under30k: products.filter(
                  (product) => product.price > 20000 && product.price <= 30000
                ),
              },
            });
        });
      }
    });
};

exports.getProductDetailsById = (req, res) => {
  const { productId } = req.params;
  if (productId) {
    Product.findOne({ _id: productId }).exec((error, product) => {
      if (error) return res.status(400).json({ error });
      if (product) {
        res.status(200).json({ product });
      }
    });
  } else {
    return res.status(400).json({ error: "Params required" });
  }
};

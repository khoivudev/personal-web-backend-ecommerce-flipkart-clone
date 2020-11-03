const Page = require("../../models/page");

exports.createPage = (req, res) => {
  const { banners, products } = req.files;
  if (banners) {
    if (banners.length > 0) {
      req.body.banners = banners.map((banner, index) => ({
        img: `${process.env.API_URL}/public/${banner.filename}`,
        navigateTo: `/bannerClicked?categoryId=${req.body.category}&type=${req.body.type}`,
      }));
    }
  }
  if (products) {
    if (products.length > 0) {
      req.body.products = products.map((product, index) => ({
        img: `${process.env.API_URL}/public/${product.filename}`,
        navigateTo: `/productClicked?categoryId=${req.body.category}&type=${req.body.type}`,
      }));
    }
  }

  req.body.createdBy = req.user._id;
  //If page is existed Find and edit
  Page.findOne({ category: req.body.category }).exec((error, page) => {
    if (error) return res.status(400).json(error);
    if (page) {
      Page.findOneAndUpdate({ category: req.body.category }, req.body, {
        useFindAndModify: false,
        new: true,
      }).exec((error, updatedPage) => {
        if (error) return res.status(400).json({ error });
        if (updatedPage) res.status(200).json({ page: updatedPage });
      });
    } else {
      //If not Create one
      const page = new Page(req.body);

      page.save((error, page) => {
        if (error) return res.status(400).json({ error });
        if (page) {
          return res.status(200).json({ page });
        }
      });
    }
  });
};

exports.getPage = (req, res) => {
  const { category, type } = req.params;
  if (type === "page") {
    Page.findOne({ category: category }).exec((error, page) => {
      if (error) return res.status(400).json({ error });
      if (page) return res.status(200).json({ page });
    });
  }
};

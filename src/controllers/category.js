var Category = require("../models/category");
var slugify = require("slugify");

function createCategories(categories, parentId = null) {
  const categoryList = [];
  let category;
  if (parentId == null) {
    category = categories.filter((cat) => cat.parentId == undefined);
  } else {
    category = categories.filter((cat) => cat.parentId == parentId);
  }
  for (let cate of category) {
    categoryList.push({
      _id: cate._id,
      name: cate.name,
      slug: cate.slug,
      parentId: cate.parentId,
      children: createCategories(categories, cate._id),
    });
  }
  return categoryList;
}

exports.addCategory = (req, res) => {
  const categoryObj = {
    name: req.body.name,
    slug: slugify(req.body.name),
  };

  if (req.file) {
    categoryObj.categoryImage =
      process.env.API_URL + "/public/" + req.file.filename;
  }

  if (req.body.parentId !== "" && req.body.parentId !== undefined) {
    categoryObj.parentId = req.body.parentId;
  }

  if (req.body.type !== "" && req.body.type !== undefined) {
    categoryObj.type = req.body.type;
  }

  const cat = new Category(categoryObj);

  cat
    .save()
    .then((category) => {
      return res.status(200).json({ category });
    })
    .catch((error) => {
      return res.status(400).json({ error });
    });
};

exports.getCategories = (req, res) => {
  Category.find({})
    .then((categories) => {
      const categoryList = createCategories(categories);
      res.status(200).json({ categoryList });
    })
    .catch((error) => {
      return res.status(400).json({ error });
    });
};

exports.updateCategories = async (req, res) => {
  const { _id, name, parentId, type } = req.body;
  const updatedCategories = [];
  if (_id instanceof Array) {
    for (let i = 0; i < _id.length; i++) {
      const toUpdateCategory = {
        name: name[i],
        slug: slugify(name[i]),
      };
      if (type[i] !== "" && type[i] !== undefined) {
        toUpdateCategory.type = type[i];
      }

      if (parentId[i] !== "" && type[i] !== undefined) {
        toUpdateCategory.parentId = parentId[i];
      }

      const updatedCategory = await Category.findOneAndUpdate(
        { _id: _id[i] },
        toUpdateCategory,
        { useFindAndModify: false, new: true }
      );
      updatedCategories.push(updatedCategory);
    }
    res.status(200).json(updatedCategories);
  } else {
    const toUpdateCategory = {
      name,
      slug: slugify(name),
    };
    if (type !== "" && type !== undefined) {
      toUpdateCategory.type = type;
    }

    if (parentId !== "" && parentId !== undefined) {
      toUpdateCategory.parentId = parentId;
    }
    const updatedCategory = await Category.findOneAndUpdate(
      { _id: _id },
      toUpdateCategory,
      { useFindAndModify: false, new: true }
    );
    res.status(200).json(updatedCategory);
  }
};

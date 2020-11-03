var Category = require("../models/category");
var slugify = require("slugify");
const shortid = require("shortid");

async function checkExistedCategory(toCheckId) {
  const categoryIds = (await Category.find({}).select("_id").exec()).map(
    (obj) => `${obj._id}`
  );
  return categoryIds.includes(toCheckId);
}

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
      type: cate.type,
      children: createCategories(categories, cate._id),
    });
  }
  return categoryList;
}

exports.addCategory = (req, res) => {
  const categoryObj = {
    name: req.body.name,
    slug: `${slugify(req.body.name)}-${shortid.generate()}`,
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
        slug: `${slugify(name[i])}-${shortid.generate()}`,
      };
      if (type[i] !== "" && type[i] !== undefined) {
        toUpdateCategory.type = type[i];
      } else {
        toUpdateCategory.type = null;
      }

      if (parentId[i] !== "" && parentId[i] !== undefined) {
        const isExistedCategory = await checkExistedCategory(parentId[i]);
        if (isExistedCategory) {
          toUpdateCategory.parentId = parentId[i];
        } else {
          return res
            .status(400)
            .json({ error: "Parent Category is not exist" });
        }
      } else {
        toUpdateCategory.parentId = null;
      }

      const updatedCategory = await Category.findOneAndUpdate(
        { _id: _id[i] },
        toUpdateCategory,
        { useFindAndModify: false, new: true }
      );
      updatedCategories.push(updatedCategory);
    }
    return res.status(200).json(updatedCategories);
  } else {
    const toUpdateCategory = {
      name,
      slug: `${slugify(name)}-${shortid.generate()}`,
    };
    if (type !== "" && type !== undefined) {
      toUpdateCategory.type = type;
    } else {
      toUpdateCategory.type = null;
    }

    if (parentId !== "" && parentId !== undefined) {
      const isExistedCategory = await checkExistedCategory(parentId);
      if (isExistedCategory) {
        toUpdateCategory.parentId = parentId;
      } else {
        return res.status(400).json({ error: "Parent Category is not exist" });
      }
    } else {
      toUpdateCategory.parentId = null;
    }
    const updatedCategory = await Category.findOneAndUpdate(
      { _id: _id },
      toUpdateCategory,
      { useFindAndModify: false, new: true }
    );
    return res.status(200).json(updatedCategory);
  }
};

exports.deleteCategories = async (req, res) => {
  const { ids } = req.body.payload;
  const deletedCategories = [];
  for (let i = 0; i < ids.length; i++) {
    const deleteCategory = await Category.findOneAndDelete({ _id: ids[i]._id });
    deletedCategories.push(deleteCategory);
  }
  if (deletedCategories.length == ids.length) {
    res.status(200).json({ message: "Category removed" });
  } else {
    res.status(400).json({ message: "Something went wrong" });
  }
};

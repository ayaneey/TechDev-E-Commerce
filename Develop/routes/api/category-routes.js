const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  let category = await Category.findAll({
    include: {
      model: Product,
    },
  });
  return res.json(category);
});

router.get("/:id", async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  let category = await Category.findOne(req.params.id, {
    include: {
      model: Product,
    },
  });
  if (!category) {
    res.status(404).json(category);
  }
});

router.post("/", async (req, res) => {
  // create a new category
  try {
    let category = await Category.create(req.body);
    res.status(200).json(category); 
  } catch (err) {
    res.status(400).json(err);
  }
});


router.put("/:id", async (req, res) => {
  // update a category by its `id` value
  let category = await Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  });
  if (!category) {
    res.status(404).json({
      message: `No categories found by this id`,
    });
  } else {
    res.status(200).json(category);
  }
});

router.delete("/:id", async (req, res) => {
  // delete a category by its `id` value
  let category = await Category.destroy(req.body, {
    where: {
      id: req.params.id
    }
  })
  if (!category){
    res.status(404).json({
      message: `No categories found by this id`,
    });
  } else {
    res.status(200).json(category);
  }
});

module.exports = router;

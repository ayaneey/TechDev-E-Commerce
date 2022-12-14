const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  let tag = await Tag.findAll({
    include: [
      {
        model: Product,
      }
    ],
  });
  return res.json(tag);
});


router.get("/:id", (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
    where: {
      id: req.params.id,
    },
    aliases: ["id", "tag_name"],
    include: [
      {
        model: Product,
        aliases: ["id", "product_name", "price", "stock", "category_id"],
      },
    ],
  })
    .then((tag) => {
      if (!tag) {
        res.status(404).json({ message: "Tag with ID NOT FOUND!" });
        return;
      }
      res.json(tag);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

 

router.post('/', async (req, res) => {
  // create a new tag
    try {
    let tag = await Tag.create(req.body);
    res.status(200).json(tag); 
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
    let tag = await Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  });
  if (!tag) {
    res.status(404).json({
      message: `No tags with this id`,
    });
  } else {
    res.status(200).json(tag);
  }
});
 

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    let tag = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });
    if (!tag){
      res.status(404).json({
        message: `No tags with this id`,
      });
    }
    res.status(200).json(tag);
  } catch (err) {
    res.status(500).json(err);
  }
});
 

module.exports = router;

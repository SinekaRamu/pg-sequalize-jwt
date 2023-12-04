const express = require("express");
const router = express.Router();
const { validate } = require("../middlewares/validate.middleware");
const {
  itemAddSchema,
  updateItemSchema,
} = require("../validations/items.schema");

const {
  addItemController,
  updateItemContentController,
  getSingleItemController,
  getItemsController,
  sortPriceAscController,
  sortPriceDescController,
  sortItemnameAscController,
  sortItemnameDescController,
  filterPriceController,
  searchController,
} = require("../controllers/items.controller");
const { overallRatingController } = require("../controllers/rating.controller");

//overall rating
router.get("/rating", overallRatingController);

router.get("/", getItemsController);
router.post("/add", validate(itemAddSchema), addItemController);
router.put("/:id", validate(updateItemSchema), updateItemContentController);
router.get("/:id", getSingleItemController);

router.get("/sort/asc-by-price", sortPriceAscController);
router.get("/sort/desc-by-price", sortPriceDescController);
router.get("/sort/asc-by-itemname", sortItemnameAscController);
router.get("/sort/desc-by-itemname", sortItemnameDescController);
router.get("/filter", filterPriceController);
router.get("/search", searchController);

module.exports = router;

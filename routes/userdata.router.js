const express = require("express");
const router = express.Router();

const {
  addfavouritecontroller,
  getFavController,
} = require("../controllers/userfav.controller");
const { addRatingController } = require("../controllers/rating.controller");
const { addToCartController } = require("../controllers/carts.controller");
const {
  addPurchaseController,
  PurchasesListController,
  updateStatusController,
  cancelListController,
} = require("../controllers/purchase.controller");
const { ratingValueSchema } = require("../validations/rating.schema");
const { addToCartSchema } = require("../validations/carts.schema");
const { buyItemSchema } = require("../validations/purchase.schema");
const { validate } = require("../middlewares/validate.middleware");
const { addFavSchema } = require("../validations/userfav.schema");

//favourites
router.post("/favourites", validate(addFavSchema), addfavouritecontroller);
router.get("/favourites", getFavController);

//cart items
router.post("/addToCart", validate(addToCartSchema), addToCartController);

//ratings
router.post("/addRating", validate(ratingValueSchema), addRatingController);

//purchases
router.get("/purchaselist/:user_id", PurchasesListController);
router.post("/add-purchase", validate(buyItemSchema), addPurchaseController);
router.patch("/cancelOrder", updateStatusController);
router.get("/cancelList", cancelListController);

module.exports = router;

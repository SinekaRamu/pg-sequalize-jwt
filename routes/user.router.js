const express = require("express");
const router = express.Router();

const {
  getUsers,
  addUserController,
  updateUserController,
  loginController,
  getAccountController,
} = require("../controllers/user.controller");
const { validate } = require("../middlewares/validate.middleware");
const {
  signUpSchema,
  updateUserSchema,
  loginSchema,
} = require("../validations/authentication.schema");
const { isAuthorised } = require("../middlewares/authorisation.middleware");

//CREATE USER ACCOUNT
router.post("/signup", validate(signUpSchema), addUserController);

//LOGIN
router.post("/login", validate(loginSchema), loginController);

//UPDATE USER DATA
router.put("/user/:id", validate(updateUserSchema), updateUserController);

//VIEW THE USER DATA
router.get("/user/:id", isAuthorised, getAccountController);

module.exports = router;

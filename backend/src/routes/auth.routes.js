const express = require("express");

const router = express.Router();

const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const validate = require("../middlewares/validate.middleware");
const {
  validateRegister,
  validateLogin,
} = require("../dto/auth.dto");

router.post(
  "/register",
  validate(validateRegister),
  authController.register
);

router.post(
  "/login",
  validate(validateLogin),
  authController.login
);
// Profile
router.get(
  "/profile",
  authMiddleware,
  authController.getProfile
);

module.exports = router;
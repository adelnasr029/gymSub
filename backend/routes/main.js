const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const homeController = require("../controllers/home");
const postsController = require("../controllers/posts");
const { ensureAuth, ensureGuest } = require("../middleware/auth");
//includes all the requests that we can make from the main route

//Main Routes - simplified for now
router.get("/", ensureAuth, homeController.getIndex);
router.get("/login",authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/home", ensureAuth ,postsController.getFeed);
router.get("/logout",ensureAuth, authController.logout);
router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);

module.exports = router;

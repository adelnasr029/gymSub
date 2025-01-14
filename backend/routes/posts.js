const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const postsController = require("../controllers/posts");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes - simplified for now
// router.get("/:id", ensureAuth, postsController.getPost);

router.post("/createPost", upload.single("image"), postsController.createPost);
router.get("/subscriber/:id", postsController.getSubscriber);
router.put("/subscriber/:id", postsController.likePost);

router.delete("/deletePost/:id", postsController.deleteSubscriber);

module.exports = router;

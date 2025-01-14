const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");
const User = require("../models/User")
const mongoose = require('mongoose')

module.exports = {
  getUser: async (req, res) => {
    try {
      console.log(req.user)
      res.status(200).json({ username: req.user?.username});
    } catch (err) {
      console.log(err);
    }
  },
  getSubscriber: async (req, res) => {
    try {
      const subscriberId = req.params.id;
  
      // Validate the ID
      if (!mongoose.Types.ObjectId.isValid(subscriberId)) {
        return res.status(400).json({ error: "Invalid subscriber ID" });
      }
  
      // Find the subscriber in the database
      const subscriber = await Post.findById(subscriberId).lean();
  
      // If subscriber not found, return a 404 error
      if (!subscriber) {
        return res.status(404).json({ error: "Subscriber not found" });
      }
  
      // Send the subscriber data as a JSON response
      res.status(200).json(subscriber);
    }catch (err) {
      console.log(err);
    }
  },
  getFeed: async (req, res) => {
    try {
      const posts = await Post.find().sort({ createdAt: "desc" }).lean();
      res.json(posts);
    } catch (err) {
      console.log(err);
    }
  },
  getPost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);

      res.render("post.ejs", { post: post, user: req.user});
    } catch (err) {
      console.log(err);
    }
  },
  
  createPost: async (req, res) => {
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);

      await Post.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phone: req.body.phone,
        startDate: new Date(req.body.startDate),
        endDate: new Date(req.body.endDate),
        amount: req.body.amount,
        image: result.secure_url,
        cloudinaryId: result.public_id,
        user: req.user,
      });
      // console.log(result)
      console.log("Post has been added!");
      console.log(req.body); // Non-file fields
      console.log(req.file); // Uploaded file
      res.send("File uploaded successfully");
        } catch (err) {
      console.log(err);
    }
  },
  likePost: async (req, res) => {
    try {
      await Post.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { likes: 1 },
        }
      );
      console.log("Likes +1");
      res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  deleteSubscriber: async (req, res) => {
    try {
      // Find post by id
      let post = await Post.findById({ _id: req.params.id });
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(post.cloudinaryId);
      // Delete post from db
      // await Post.remove({ _id: req.params.id });
      console.log("Deleted Post");
    } catch (err) {
      console.log(err);
    }
  },
};

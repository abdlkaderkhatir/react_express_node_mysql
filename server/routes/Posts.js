const express = require("express");
const router = express.Router();
const {Posts} =require("../models")


router.get("/", async (req, res) => {
  const posts = await Posts.findAll();
  res.json(posts);
    // res.json("Hello World")
    // res.send("Hello World")
});

router.post("/", async (req, res) => {
  // const post = req.body;
  const post= await Posts.create(req.body);
  res.json(post);
});

module.exports = router;

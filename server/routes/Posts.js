const express = require("express");
const router = express.Router();
const {Posts,Likes} =require("../models")
const { validateToken } = require("../middlewares/AuthMiddleware");

router.get("/",validateToken ,async (req, res) => {
  const posts = await Posts.findAll({ include: [Likes] });
  const likedPosts = await Likes.findAll({ where: { UserId: req.user.id } });
  res.json({ listOfPosts: posts, likedPosts: likedPosts });
    // res.send("Hello World")
});

router.get("/byId/:id", async (req, res) => {
  const id = req.params.id;
  
  const post = await Posts.findByPk(id);
  res.json(post);
});

router.get("/byuserId/:id", async (req, res) => {
  const id = req.params.id;
  const listOfPosts = await Posts.findAll({
    where: { UserId: id },
    include: [Likes],
  });
  res.json(listOfPosts);
});

router.post("/",validateToken, async (req, res) => {
  const post = req.body;
  post.username=req.user.username;
  post.UserId = req.user.id;
  const crpost= await Posts.create(post);
  res.json(crpost);
});

router.delete("/:postId", validateToken, async (req, res) => {
  const postId = req.params.postId;
  await Posts.destroy({
    where: {
      id: postId,
    },
  });

  res.json("DELETED SUCCESSFULLY");
});

module.exports = router;

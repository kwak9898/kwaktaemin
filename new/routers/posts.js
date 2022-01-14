const express = require("express");
const Posts = require('../schemas/posts')
const router = express.Router();
const userMiddleware = require("../middlewares/middle");

router.get("/posts", async (req, res, next) => {
  try {
    const { date } = req.query;
    const posts = await Posts.find({ date }).sort("-date");
    res.json({ posts: posts });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.get("/posts/:name", async (req, res) => { 
  const { name } = req.params;
  // console.log(name)
  const posts = await Posts.findOne({ name: name });
  // console.log(posts)
  res.json({ posts: posts });
});

router.post ("/posts", userMiddleware, async (req, res) => {
     try {
        console.log(req.body)
          await Posts.create({ 
          title: req.body.title,
          content: req.body.content,
          name: req.body.name,
          password: req.body.password
         });
        res.send({ result: "success" })
     } catch(err) {
         console.log("----------------------------")
         console.log("에러다" + err)
        res.redirect("/")
     }
})

router.patch("/posts/:name", userMiddleware, async (req, res) => {
  const { name } = req.params;
  const { password, title, content} = req.body;

  const posts = await Posts.findOne({ name: name, password: password});
  console.log(posts)
  if (posts) {
    await Posts.updateOne({ name }, { title: title, content: content}); //db의 필드값: req.body
    res.send({ result: "success" });
  } else {
    res.send({ result: "fail" });
  }
})

router.delete("/posts/:name", userMiddleware, async (req, res) => {
  const { name } = req.params;
  const { password } = req.body;

  const posts = await Posts.findOne({ name: name, password: password });
  if (posts) {
    await Posts.deleteOne({ name })
    res.send({ result: "success" })
  } else {
    res.send({ result: "fail" })
  }
})

module.exports = router;
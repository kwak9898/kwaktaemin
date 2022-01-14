const express = require('express')
const Posts = require('./schemas/posts')
const app = express()
const port = process.env.PORT || 3000

const connect = require("./schemas");
connect();

app.use(express.urlencoded({extended: false}))
app.use(express.json())

const postsRouter = require("./routers/posts");
app.use("/api", postsRouter);

const UserRouter = require('./routers/users');
app.use("/api", UserRouter);

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/home', async (req, res) => {
    const posts = await Posts.find()
    res.render('home', {posts: posts})
})

app.get('/login', (req, res) => {
    res.render('login')
})

app.get('/register', (req, res) => {
    res.render('register')
})

app.get('/write', (req, res) => {
    res.render('write')
})

app.get('/comment/:name', (req, res) => {
    let name  = req.params;
    res.render('comment', { name: name })
})

app.get('/update/:name', (req, res) => {
    let name = req.params;
    res.render('update', { name: name })
})

app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`)
  })
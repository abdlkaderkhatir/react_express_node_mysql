const express = require('express');
const app =express()
const cors = require("cors");

// database
const db = require('./models');

// Routes
const postRouter= require("./routes/Posts")
const commentsRouter = require("./routes/Comments");
const usersRouter = require("./routes/Users");
const likesRouter = require("./routes/Likes");



app.use(express.json())
app.use(cors())

//#########Routes 

app.use("/posts",postRouter)
app.use("/comments", commentsRouter);
app.use("/auth", usersRouter);
app.use("/likes", likesRouter);



db.sequelize.sync().then(
    ()=>{
        app.listen(3001,() => {
            console.log("server run on port 3001")
        });
    }
);


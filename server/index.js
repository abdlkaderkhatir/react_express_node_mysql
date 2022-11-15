const express = require('express');
const app =express()
const db = require('./models');
const postRouter= require("./routes/Posts")


app.use(express.json())
//#########Routes 
app.use("/posts",postRouter)





db.sequelize.sync().then(
    ()=>{
        app.listen(3001,() => {
            console.log("server run on port 3001")
        });
    }
);


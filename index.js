const express = require('express')
const app = express()
const dbconnection  = require('./src/utils/mysql.connector')

const post = require('./src/posts/post.model')

app.get('/api/v1', function(req,res){
    return res.json(req.headers)
})

app.get('/api/v1/post', function(req,res){
    return res.json([post])
    
})

app.listen(3000,function(){
    console.log('SWIMMING AND CAMPSITE listening on port 3000')
    dbconnection.connect(function(err){
        if (err) throw err
        console.log("connected to mySQL")
    })
})

const express = require('express')
const app = express()
const dbconnection  = require('./src/utils/mysql.connector')

// middlewares

const post = require('./src/posts/post.model')
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.post('/clients',(req,res)  => {
    const { id, username, email} = req.body;
    const sql = `INSERT INTO clients(id,username,email) VALUES('${id}', '${username}','${email}')`;

    return dbconnection.query(sql,(error, results)=>{
        if(error) {
            console.log('Error inserting data into clients tables:',error)
            res.status(500).send('Error inserting data into clients table');

        }else{
            console.log('Data inserted successfully into clients table:',results);
            res.send('Data inserted successfully into clients tables');
        }
    });

});

// for deleting records //
app.delete('/clients/:id',(req,res) =>{
    const id = req.params.id;
    //delete records from database using id 
    const sql = `DELETE FROM clients WHERE id = ?`;
    const values = [id];
    dbconnection.query(sql,values,(error,results) => {
        if(error){
            console.log(error);ik
        }else{
            res.send('clients with ID ${id} deleted successfully');
        }
    });
});

// getting client//

app.get('/Clients/:id',(req,res) => {
    const id = req.params.id;
    //retrieve message
    const sql =     `SELECT * FROM clients WHERE id = ${id}`
    const values = [id];
    dbconnection.query(sql,values,(error,results) =>{
        if(error){
            console.log(error);
            res.status(500).send('error retrieving message');
         }else{
            res.send(results);
         }
    });
    
});
// creating update endpoint
app.patch('/api/vi/posts/:id', function (request, response)  {
  const sql =`SELECT * FROM clients WHERE id = ${request.params.id} LIMIT 1`
  return dbconnection.query(sql, function(err,rows){
    if (err) throw err
    const post= request.body 
   // console.log(post)
if (rows.length >= 1){
  let props = []
  props = Object.keys(post).map((key, index) => {
    return `${key}='${post[key]}'`
  })
  const updateSql = `UPDATE clients SET ${props.join(',')} WHERE id=${rows[0].id}`
  return dbconnection.query(updateSql, function(err,result){
    if (err) throw err
    if (result.affectedRows === 0) {
      return response.status(404).json({
        status:false,
        statusCode:404,
        message:  `Post with id ${request.params.id} does not exist`
      })
    }
    return response.status(200).json({
      status:true,
      statusCode:200,
      message:  'Post updated successfully'
    })
  })
}
  
})
})


  


    
        
    



  
    





//app.delete('/api/v1/posts/:id', function(req,res){
   // const id = req.params.id;

   // dbconnection.query(`DELETE FROM user WHERE id='${id}';`, function(err, result) {
      //  if(err) throw err.message

      //  return res.json({result})
   // })
//
// app.put('/api/v1/posts/:id', function(req,res){
   /* const {id} = req.params

    dbconnection.query(`DELETE FROM user WHERE id='${id}';`, function(err, result) {
        if(err) throw err.message

        return res.json({result})
    })
// })*/




app.listen(3000,function(req ,res){
    console.log('SWIMMING AND CAMPSITE listening on port 3000')
    dbconnection.connect(function(err){
        if (err) throw err.message
        console.log("connected to mySQL")
    })
})

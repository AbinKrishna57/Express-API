const express = require("express")
const mysql=require("mysql2")
const del_router = express.Router()

const db=mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '<password>',
  database: '<database>'
})

db.connect((err)=>{
  if(err){
    return res.status(500).send("Connection Error", err)
  }
  console.log("Connected To the Server through del_router")
})

del_router.get("/delete", (req, res)=>{
  res.render("delete")
})

del_router.post("/delete/delete-user", (req, res)=>{
  const userid=req.body.id
  const sql_del_query="DELETE FROM test WHERE ID=?"
  db.query(sql_del_query, [userid], (err, result)=>{
    if(err){
      return res.status(500).send("Query Error", err)
    }
    res.redirect("/all-data")
  })
})

module.exports=del_router

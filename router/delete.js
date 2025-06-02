const express = require("express")
const mysql=require("mysql2")
const del_router = express.Router()

const db=mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Server###Beast69#',
  database: 'Exp'
})

db.connect((err)=>{
  if(err){
    console.error("Connection Error", err)
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
      console.error("there was an error", err)
    }
    res.redirect("/all-data")
  })
})

module.exports=del_router
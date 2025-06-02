const express=require("express")
const mysql=require("mysql2")
const up_router=express.Router()

const db=mysql.createConnection({
  host: 'localhost',
  user: "root",
  password: "Server###Beast69#",
  database: "Exp"
})

db.connect((err)=>{
  if(err){
    console.error("Connection Error", err)
  }
  console.log("Connected To the Server through router")
})

up_router.get("/update", (req, res)=>{
  res.render("update")
})


module.exports=up_router
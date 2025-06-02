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
  console.log("Connected To the Server through update_router")
})

up_router.get("/update", (req, res)=>{
  res.render("update")
})

up_router.post("/update/update-user", (req, res)=>{
  const {id, col_name, val}=req.body
  const col_names=["First_Name", "Last_Name", "Phone_Number", "Address", "email"]
  if(!col_names.includes(col_name)){
    console.error("Invalid Column Name")
  }
  const up_sql_query=`UPDATE test SET ${col_name}=? WHERE ID=?`
  db.query(up_sql_query, [val, id], (err, result)=>{
    if(err){
      console.error("there was an error", err)
    }
    res.redirect("/all-data")
  })
})


module.exports=up_router
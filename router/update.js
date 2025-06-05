const express=require("express")
const mysql=require("mysql2")
const up_router=express.Router()

const db=mysql.createConnection({
  host: 'localhost',
  user: "root",
  password: "<password>",
  database: "<database>"
})

db.connect((err)=>{
  if(err){
    return res.status(500).send("Cannot connect to the database")
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
    return res.status(500).send('Invalid Column Name');
  }
  const pattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if(col_name==="email" && !pattern.test(val)){
    return res.status(500).send('Invalid Email Format');
  }
  const up_sql_query=`UPDATE test SET ${col_name}=? WHERE ID=?`
  db.query(up_sql_query, [val, id], (err)=>{
    if(err){
      return res.status(500).send("Query Error", err)
    }
    res.redirect("/all-data")
  })
})


module.exports=up_router

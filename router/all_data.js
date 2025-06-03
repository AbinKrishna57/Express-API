const express=require("express")
const all_data=express.Router()
const mysql=require("mysql2")

const db=mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Server###Beast69#',
  database: 'Exp'
})

db.connect((err)=>{
  if(err){
    return res.status(500).send("Connection Error", err)
  }
  console.log("Connected To the Server through all_data")
})

all_data.get("/all-data", (req, res) => {
  db.query("SELECT * FROM test", (err, results) => {
    if(err){
      return res.status(500).send("Query Error", err)
    }

    res.json(results)
  });
});

module.exports=all_data
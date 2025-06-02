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
    console.error("There was an error", err)
  }
  console.log("Connected To the Server through all_data")
})

all_data.get("/all-data", (req, res) => {
  db.query("SELECT * FROM test", (err, results) => {
    if(err){
      console.error("There was an error", err);
    }

    res.json(results)
  });
});

module.exports=all_data
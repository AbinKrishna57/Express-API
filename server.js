const express=require("express")
const mysql=require("mysql2")
const bodyParser=require("body-parser")
const app=express()

app.set("view engine", "ejs")

app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended: false}))

const deleteRouter=require("./router/delete")
const updateRouter=require("./router/update")
app.use(updateRouter)
app.use(deleteRouter)

const db=mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '<password>',
  database: 'Exp'
})

db.connect((err)=>{
  if(err){
    console.error("Connection Error", err)
  }
  console.log("Connected To the Server")
})

app.get("/", (req, res)=>{
  res.render("index.html")
})

app.get("/data", (req, res, next)=>{
  db.query("SELECT * FROM test", (err, result)=>{
    if(err){
      console.error("There was an error", err)
    }
    res.json(result)
  })
})

app.get("/add", (req, res)=>{
  res.render("add")
})

app.post("/new-user", (req, res)=>{
  const {fname, lname, phn, addr}=req.body

  const sql_query=("INSERT INTO test(First_Name, Last_Name, Phone_Number, Address) VALUES (?, ?, ?, ?)")
  db.query(sql_query, [fname, lname, phn, addr], (err, result)=>{
    if(err){
      console.error("There was an error", err)
    }
  })
  db.query("SELECT * FROM test", (err, results)=>{
    if(err){
      console.error("There was an error", err)
    }
    res.json(results)
  })
})

app.listen(3000, ()=>{
  console.log(`Listening at port 3000`)
})

module.exports={db}
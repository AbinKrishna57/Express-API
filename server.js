const express=require("express")
const mysql=require("mysql2")
const bodyParser=require("body-parser")
const path=require("path")
const app=express()

app.set("view engine", "ejs")

app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended: false}))

const deleteRouter=require("./router/delete")
const updateRouter=require("./router/update")
const allDataRouter=require("./router/all_data")
app.use(updateRouter)
app.use(deleteRouter)
app.use(allDataRouter)

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
  console.log("Connected To the Server")
})

app.get("/", (req, res)=>{
  res.render("index.html")
})

app.get("/all-data", (req, res)=>{
  res.render("all_data")
})

app.get("/search", (req, res)=>{
  res.sendFile(path.join(__dirname, "public", "search.html"))
})

app.get("/add", (req, res)=>{
  res.render("add")
})

app.post("/new-user", (req, res)=>{
  const {fname, lname, phn, addr, email}=req.body

  const sql_query=("INSERT INTO test(First_Name, Last_Name, Phone_Number, Address, email) VALUES (?, ?, ?, ?, ?)")
  db.query(sql_query, [fname, lname, phn, addr, email], (err, result)=>{
    if(err){
      return res.status(500).send("Query Error", err)
    }
  })
  db.query("SELECT * FROM test", (err, results)=>{
    if(err){
      return res.status(500).send("Query Error", err)
    }
    res.json(results)
  })
})

app.listen(3000, ()=>{
  console.log(`Listening at port 3000`)
})

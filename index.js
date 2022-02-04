const express = require("express")
const app = express();
const cors = require("cors")

const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "postgres",
    host: "localhost",
    port: "5433", // Port may differ between users
    database: "gyeme"
})

app.use(cors())
app.use(express.json())

//Routes:

//create a class

app.post("/classes", async (req, res) =>{
    try {
        console.log(req.body)
    } catch (error) {
        console.log(error.message)
    }
})

//update a class

//delete a class 

//get all classes

//create a trainer

//delete a trainer

//get all trainers

app.listen(5000, () => {
    console.log('Server has started on port 5000')
})
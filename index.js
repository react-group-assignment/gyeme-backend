const express = require("express")
const app = express();
const cors = require("cors")

const Pool = require("pg").Pool;

//Credentials
const pool = new Pool({
    user: "postgres",
    password: "postgres",
    host: "localhost",
    port: "5433", // Port may differ between users
    database: "gyeme"
})

app.listen(5000, () => {
    console.log('Server has started on port 5000')
})

app.use(cors())
app.use(express.json())

//ROUTES:

//create a class
app.post("/classes", async (req, res) =>{
    try {
        const {name, description, members_only} = req.body
        const newClass = await pool.query(
            "INSERT INTO classes (name, description, members_only) VALUES($1, $2, $3) RETURNING *",
            [name, description, members_only]
        )
        res.json(newClass.rows[0])
    } catch (error) {
        console.error(error.message)
    }
})

//get a class
app.get("/classes/:id", async (req, res) => {
    try {
        const {id} = req.params
        const thisClass = await pool.query("SELECT * FROM classes WHERE id = $1" , [id]) //variable is named thisClass because class is a reserved word
        res.json(thisClass.rows[0])
    } catch (error) {
        console.error(error.message)
    }
})

//update a class
app.put("/classes/:id", async (req, res) => {
    try {
        const {id} = req.params
        const {name, description, members_only, location_id} = req.body
        const updateClass = await pool.query(
            "UPDATE classes SET (name, description, members_only, location_id) = ($1, $2, $3, $4) WHERE id = $5",
            [name, description, members_only, location_id, id]
        )
        res.json("Class was updated successfully.")
    } catch (error) {
        console.error(error.message)
        
    }
})

//delete a class 
app.delete("/classes/:id", async (req, res) => {
    try {
        const {id} = req.params
        const deleteClass = await pool.query("DELETE FROM classes WHERE id = $1", [
            id
        ])
        res.json("Class was successfully deleted.")
    } catch (error) {
        console.error(error.message)
    }
})

//get all classes
app.get("/classes", async(req,res) =>{
    try {
        const allClasses = await pool.query("SELECT * FROM classes")
        res.json(allClasses.rows)
    } catch (error) {
        console.error(error.message)
    }
})

//create a user
app.post("/users", async (req, res) => {
    try {
        const { username, email, password, role_id, location_id} = req.body
        const newUser = await pool.query(
            "INSERT INTO users (username, email, password, role_id, location_id) VALUES($1, $2, $3, $4, $5) RETURNING *",
            [username, email, password, role_id, location_id]
        )
        res.json(newUser.rows[0])
    } catch (error) {
        console.error(error.message)
    }
})

//get a user
app.get("/users/:id", async (req, res) => {
    try {
        const {id} = req.params
        const user = await pool.query("SELECT * FROM users WHERE id = $1" , [id])
        res.json(user.rows[0])
    } catch (error) {
        console.error(error.message)
    }
})

//delete a user
app.delete("/users/:id", async (req, res) => {
    try {
        const {id} = req.params
        const deleteUser = await pool.query("DELETE FROM users WHERE id = $1", [
            id
        ])
        res.json("User was successfully deleted.")
    } catch (error) {
        console.error(error.message)
    }
})

//get all users
app.get("/users", async (req, res) => {
    try {
        const allUsers = await pool.query("SELECT * FROM users")
        res.json(allUsers.rows)
    } catch (error) {
        console.error(error.message)
    }
})
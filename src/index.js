const express = require('express')
const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    password: 'postgres',
    host: 'localhost',
    port: 5432,
    database: 'gyeme'
})

const app = express()
const port = 4000

app.get('/', (req, res) => {
    pool.query('SELECT * FROM public.users', (error, results) => {
        res.send(error ? {error: error.message } : results.rows)
    })
})

app.get('/classes', (req, res) => {
    res.send('<h1>Gyeme Express API</h1>')
})

app.get('/trainers', (req, res) => {
    res.send('<h1>Gyeme Express API</h1>')
})

app.get('/blogs', (req, res) => {
    res.send('<h1>Gyeme Express API</h1>')
})

app.get('/blogs/:id', (req, res) => {
    const id = parseInt(req.params.id)

    pool.query('SELECT * FROM public.users WHERE id =  $1', [id], (error, results) => {
        res.send(error ? {error: error.message } : results.rows[0])
    })
})

app.listen(port, () => {
    console.log(`Gyeme API listening at http://localhost:${port}`)
})

const express = require('express') //initializing express+its methods
const app = express()
const MongoClient = require('mongodb').MongoClient

const PORT = 3001

let notes = [
  { user: 'Striemer#4188', country: 'DEU' },
  { user: 'wart#0416', country: 'USA' },
  { user: 'ISellDrugsToTheCommunity#8648', country: 'USA' },
]

// root directory
app.get('/', (req, res) => {
  res.send('<h1>Test</h1>')
})

// req and res are short for request and response
app.get('/api/notes', (req, res) => {
  res.json(notes)
})

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
})

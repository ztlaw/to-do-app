const express = require('express') //initializing express+its methods
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 3001
//middleware to access the content of req.body
const bodyParser = require('body-parser')

require('dotenv').config()

let notes = [
  { user: 'Striemer#4188', country: 'DEU' },
  { user: 'wart#0416', country: 'USA' },
  { user: 'ISellDrugsToTheCommunity#8648', country: 'USA' },
]

let db,
  dbConnectionStr = process.env.DB_STRING,
  dbName = 'to-do-app'

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true }) //connecting database to mongo
  .then((client) => {
    console.log(`Now connected to the ${dbName} database.`)
    db = client.db(dbName)

    //Creates a collection named tasks
    const tasksCollection = db.collection('tasks')
    app.post('/', (req, res) => {
      //adds submitted tasks to the task collection
      tasksCollection.insertOne(req.body)
      res.redirect('/')
    })

    app.get('/', (req, res) => {
      //reads the tasks from the database
      db.collection('tasks')
        .find()
        .toArray()
        .then((results) => {
          res.render('index.ejs', { tasks: results })
        })
    })
  })

app.set('view engine', 'ejs') //middleware
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// root directory

//Logs the new tasks to the console - should be changed so that the new task is added to the database

// req and res are short for request and response
app.get('/api/notes', (req, res) => {
  res.json(notes)
})

app.listen(process.env.PORT || PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
})

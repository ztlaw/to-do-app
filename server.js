const express = require('express') //initializing express+its methods
const app = express()
const morgan = require('morgan')
const MongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectId
const PORT = 3001
//middleware to access the content of req.body
const bodyParser = require('body-parser')

require('dotenv').config()

let db,
  dbConnectionStr = process.env.DB_STRING,
  dbName = 'to-do-app'

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true }) //connecting database to mongo
  .then((client) => {
    console.log(`Now connected to the ${dbName} database.`)
    db = client.db(dbName)
  })

app.use(morgan('dev'))
app.set('view engine', 'ejs') //middleware
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', (req, res) => {
  //reads the tasks from the database
  db.collection('tasks')
    .find()
    .toArray()
    .then((results) => {
      res.render('index.ejs', { tasks: results })
    })
})

//Creates a collection named tasks
// de - I commented this out so we can move routes outside of the mongoDB connect function.
// w/o this we can call our collection with db.collection('tasks')
// const tasksCollection = db.collection('tasks')
app.post('/', (req, res) => {
  //adds submitted tasks to the task collection
  db.collection('tasks')
    .insertOne(req.body)
    .then((data) => {
      return res.redirect('/')
    })
})

app.put('/', (req, res) => {
  db.collection('tasks')
    .updateOne(
      { _id: new ObjectId(req.body.id) },
      { $set: { taskDescription: req.body.taskDescription } }
    )
    .then((data) => {
      return res.send(
        db.collection('tasks').findOne({ _id: new ObjectId(req.body.id) })
      )
    })
})

//back-end delete method. front end will send and fetch information
app.delete('/deleteTask', (req, res) => {
  db.collection('tasks').deleteOne({
    _id: ObjectId(req.body._id) //deleteOne method filters the tasks ID to find and delete
  })        
      .then(result =>{
    console.log('Task Deleted')
    res.json('Task Deleted')
    })
})


app.listen(process.env.PORT || PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
})


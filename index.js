const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const {pool} = require('./config')

const app = express()

// just a test for git

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())

const getChecks = (request, response) => {
  pool.query('SELECT * FROM bgt_forecast', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const addCategory = (request, response) => {
  const {category_name} = request.body

  pool.query(
    'INSERT INTO bgt_categories (category_name) VALUES ($1)',
    [category_name],
    (error) => {
      if (error) {
        throw error
      }
      response.status(201).json({status: 'success', message: ' category added.'})
    },
  )
}

app
  .route('/budget')
  // GET endpoint
  .get(getChecks)
  // POST endpoint
  .post(addCategory)

// Start server
app.listen(process.env.PORT || 3002, () => {
  console.log(`Server listening`)
})
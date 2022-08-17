const express = require('express')

const db = require('../db')

const router = express.Router()
module.exports = router

// GET /locations
router.get('/', (req, res) => {
  db.getAllLocations()
    .then((locations) => {
      res.render('showLocations', { locations })
    })
    .catch((err) => {
      console.error(err)
      res.status(500).send('Server error')
    })
})

// GET /locations/4/edit
router.get('/:id/edit', (req, res) => {
  const id = Number(req.params.id)

  db.getLocationById(id)
    .then((location) => {
      console.log(location)
      res.render('editLocation', location)
    })
    .catch((err) => {
      console.error(err)
      res.status(500).send('Server error')
    })
})

// POST /locations/edit
router.post('/edit', (req, res) => {
  // ASSISTANCE: So you know what's being posted ;)
  // const { id, name, description } = req.body

  // TODO: Update the location in the database based on its id
  const viewData = req.body
  console.log(viewData)
  db.updateLocation(viewData)
    .then(() => {
      res.redirect('/locations')
    })
    .catch((err) => {
      console.error(err)
      res.status(500).send('Server error')
    })
})

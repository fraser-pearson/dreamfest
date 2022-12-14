const express = require('express')

const { eventDays, capitalise, validateDay } = require('../helpers')
const db = require('../db')

const router = express.Router()
module.exports = router

// GET /events/add/friday
router.get('/add/:day', (req, res) => {
  const day = validateDay(req.params.day)
  const days = eventDays.map((eventDay) => ({
    value: eventDay,
    name: capitalise(eventDay),
    selected: eventDay === day ? 'selected' : '',
  }))

  db.getAllLocations()
    .then((locations) => {
      const viewData = { locations, days, day }
      res.render('addEvent', viewData)
    })
    .catch((err) => {
      console.error(err)
      res.status(500).send('Server error')
    })
})

// POST /events/add
router.post('/add', (req, res) => {
  // ASSISTANCE: So you know what's being posted ;)
  console.log(req.body)
  const { name, description, time, locationId } = req.body
  const day = validateDay(req.body.day)

  // TODO: Add the event to the database and then redirect

  //const day = 'friday' // TODO: Remove this line
  const viewData = {
    name: name,
    description: description,
    time: time,
    location_id: locationId,
    day: day,
  }
  db.addNewEvent(viewData)
    .then(() => {
      res.redirect(`/schedule/${day}`)
    })
    .catch((err) => {
      console.error(err)
      res.status(500).send('Server error')
    })
})

// POST /events/delete
router.post('/delete', (req, res) => {
  // const id = Number(req.body.id)
  // const day = validateDay(req.body.day)

  // TODO: Delete the event from the database using its id

  const day = 'friday' // TODO: Remove this line

  res.redirect(`/schedule/${day}`)
})

// GET /events/3/edit
router.get('/:id/edit', (req, res) => {
  const id = Number(req.params.id)

  // TODO: Replace event below with the event from the database using its id
  // NOTE: It should have the same shape as this one
  const event = {
    id: id,
    locationId: 1,
    day: 'friday',
    time: '2pm - 3pm',
    name: 'Slushie Apocalypse I',
    description:
      'This is totally a description of this really awesome event that will be taking place during this festival at the Yella Yurt. Be sure to not miss the free slushies cause they are rad!',
  }

  // TODO: Replace locations below with all of the locations from the database
  // NOTE: The objects should have the same shape as these.
  // The selected property should have a value of
  // either 'selected' or '' based on event.locationId above.
  const locations = [
    { id: 1, name: 'TangleStage', selected: '' },
    { id: 2, name: 'Yella Yurt', selected: 'selected' },
    { id: 3, name: 'Puffy Paddock', selected: '' },
    { id: 4, name: 'Kombucha Karavan', selected: '' },
  ]

  // This is done for you
  const days = eventDays.map((eventDay) => ({
    value: eventDay,
    name: capitalise(eventDay),
    selected: eventDay === event.day ? 'selected' : '',
  }))

  const viewData = { event, locations, days }
  res.render('editEvent', viewData)
})

// POST /events/edit
router.post('/edit', (req, res) => {
  // ASSISTANCE: So you know what's being posted ;)
  // const { name, description, time } = req.body
  // const id = Number(req.body.id)
  // const day = validateDay(req.body.day)
  // const locationId = Number(req.body.locationId)

  // TODO: Update the event in the database using the identifiers created above

  const day = 'friday' // TODO: Remove this line

  res.redirect(`/schedule/${day}`)
})

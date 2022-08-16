const environment = process.env.NODE_ENV || 'development'
const config = require('./knexfile')[environment]
const connection = require('knex')(config)

module.exports = {
  getAllLocations,
  getEventsByDay,
}

function getAllLocations(db = connection) {
  // TODO: use knex to get the real location data from the database
  return db('locations').select()
}

// TODO: write some more database functions
function getEventsByDay(day, db = connection) {
  return db('events')
    .join('locations', 'locations.id', 'events.locations_id')
    .select()
    .where('day', day)
    .first()
}

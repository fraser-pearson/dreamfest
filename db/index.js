const environment = process.env.NODE_ENV || 'development'
const config = require('./knexfile')[environment]
const connection = require('knex')(config)

module.exports = {
  getAllLocations,
  getEventsByDay,
  getLocationById,
  updateLocation,
}

function getAllLocations(db = connection) {
  // TODO: use knex to get the real location data from the database
  return db('locations').select()
}

// TODO: write some more database functions
function getEventsByDay(day, db = connection) {
  return db('events')
    .join('locations', 'events.location_id', 'locations.id')
    .where('day', day)
    .select(
      'events.name as eventName',
      'day',
      'time',
      'events.description as description',
      'locations.name as locationName',
      'events.id'
    )
}

function getLocationById(locationId, db = connection) {
  return db('locations').select().where('id', locationId).first()
}

function updateLocation(update, db = connection) {
  return db('locations')
    .update({
      //id: update.id,
      name: update.name,
      description: update.description,
    })
    .where('id', update.id)
}

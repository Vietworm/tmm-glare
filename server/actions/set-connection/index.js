const P = require('bluebird')
const { firebase } = require('../../firebase')

const db = firebase.database().ref()

module.exports = ({ data, resolve, reject }) => {
  const { from, to, latitude, longitude, timestamp } = data

  return P.coroutine(function* setConnection() {

    const connectionKey = [from, to].join('::::')

    // Set the connection entry
    yield db.child(`connections/${connectionKey}`)
      .set({
        from,
        latitude,
        longitude,
        timestamp,
        to,
      })

    // Set the connection and set hasAccess true on both user objects
    const fromUpdate = {
      [`connections/${to}`]: to,
      hasAccess: true,
    }

    const toUpdate = {
      [`connections/${from}`]: from,
      hasAccess: true,
      from,
    }

    yield P.props({
      to: db.child(`users/${from}`).update(fromUpdate),
      from: db.child(`users/${to}`).update(toUpdate),
    })

    // Now remove the beacons
    yield P.props({
      removeBeaconFrom: db.child(`beacons/${from}`).set(null),
      removeBeaconLocationFrom: db.child(`beaconLocations/${from}`).set(null),
      removeBeaconTo: db.child(`beacons/${to}`).set(null),
      removeBeaconLocationTo: db.child(`beaconLocations/${to}`).set(null),
    })
  })().then(resolve).catch((err) => {
    const message = {
      type: 'CONNECTION_FAILED',
      timestamp: Date.now(),
    }

    // Set the failed messages to both connecting users
    return P.props({
      to: db.child(`messages/${to}/${from}`).set(message),
      from: db.child(`messages/${from}/${to}`).set(message),
    }).then(() => {
      return reject(err)
    })
  })
}

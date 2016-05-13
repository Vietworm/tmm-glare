import _ from 'lodash'

import {
  SIGN_OUT_SUCCESS
} from 'src/core/auth'

import {
  CREATE_OWN_BEACON,
  REMOVE_BEACON,
  CREATE_OWN_BEACON_ERROR,
  BEGIN_CONNECTING,
  CONNECT_SUCCESS,
  CONNECT_CANCELED,
  FOUND_BEACON,
  GEOLOCATION_DENIED,
  GEOLOCATION_ERROR,
} from './action-types'


export const initialState = {
  isConnecting: false,
  beacons: [],
}

function setIsConnecting(state, bool) {
  return {
    ...state,
    isConnecting: bool,
  }
}

function removeBeacon(state, userId) {
  return {
    ...state,
    beacons: state.beacons.filter(beacon => {
      return beacon.id !== userId
    })
  }
}

function setNewBeacon(state, user) {
  const newBeacons = _.uniqBy(state.beacons.concat(user), 'key')
  return {
    ...state,
    beacons: newBeacons,
  }
}

export function connectReducer(state = initialState, action) {
  switch (action.type) {

    case SIGN_OUT_SUCCESS:
      return setIsConnecting(state, false)
    case CREATE_OWN_BEACON:
      return state
    case REMOVE_BEACON:
      return removeBeacon(state, action.payload)
    case CREATE_OWN_BEACON_ERROR:
      return setIsConnecting(state, false)
    case BEGIN_CONNECTING:
      return setIsConnecting(state, true)
    case GEOLOCATION_DENIED:
      return setIsConnecting(state, false)
    case GEOLOCATION_ERROR:
      return setIsConnecting(state, false)
    case FOUND_BEACON:
      return setNewBeacon(state, action.payload)
    case CONNECT_SUCCESS:
      return setIsConnecting(state, false)
    case CONNECT_CANCELED:
      return {
        ...state,
        beacons: [],
        isConnecting: false,
      }
    default:
      return state
  }
}

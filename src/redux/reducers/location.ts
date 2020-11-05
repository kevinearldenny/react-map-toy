import { Cmd, Loop, loop, LoopReducer } from 'redux-loop';
import { getType } from 'typesafe-actions';

import { Action } from '../actions/actions';
import {
  getCurrentLocation,
  setLocation,
  locationNotFound
} from '../actions/location';

import { CurrentLocation } from '../models';
import { Resource } from '../resource';
import { fetchCurrentLocation } from '../actions/geolocation';

export type LocationState = Resource<CurrentLocation>;

export const initialState: LocationState = {
  isPending: false
};

// In Redux, your reducer listens for actions which may optionally have a
// payload. Each type of action is handled separately within the reducer to
// return a new state object based on some logic. `redux-loop` handles effects
// within the reducer, so now instead of just returning a new state object (eg.
// `TodoState`) we may also return a `Loop` which wraps the new state plus some
// effect (very often a `Cmd.run`).
const locationReducer: LoopReducer<LocationState, Action> = (
  state: LocationState = initialState,
  action: Action
): LocationState | Loop<LocationState> => {
  switch (action.type) {
    case getType(getCurrentLocation):
      return loop(
        {
          isPending: true
        },
        Cmd.run(fetchCurrentLocation, {
          successActionCreator: setLocation,
          failActionCreator: locationNotFound,
          args: [] as Parameters<typeof fetchCurrentLocation>
        })
      );
    case getType(setLocation):
      return {
        resource: action.payload
      };
    case getType(locationNotFound):
      return {
        errorMessage: 'Location not found'
      };
    default:
      return state;
  }
};

export default locationReducer;

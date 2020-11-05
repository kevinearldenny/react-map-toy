import { Cmd, Loop, loop, LoopReducer } from 'redux-loop';
import { getType } from 'typesafe-actions';

import { Action } from '../actions/actions';
import {
  getPizzaPlaces,
  setPizzaPlaces,
  pizzaPlacesNotFound
} from '../actions/pizzaPlaces';

import { PizzaPlace } from '../models';
import { Resource } from '../resource';
import { readPizzaPlaces } from '../actions/readPizza';

export type PizzaPlaceState = Resource<PizzaPlace[]>;

export const initialState: PizzaPlaceState = {
  isPending: false
};

// In Redux, your reducer listens for actions which may optionally have a
// payload. Each type of action is handled separately within the reducer to
// return a new state object based on some logic. `redux-loop` handles effects
// within the reducer, so now instead of just returning a new state object (eg.
// `TodoState`) we may also return a `Loop` which wraps the new state plus some
// effect (very often a `Cmd.run`).
const pizzaReducer: LoopReducer<PizzaPlaceState, Action> = (
  state: PizzaPlaceState = initialState,
  action: Action
): PizzaPlaceState | Loop<PizzaPlaceState> => {
  switch (action.type) {
    case getType(getPizzaPlaces):
      return loop(
        {
          isPending: true
        },
        Cmd.run(readPizzaPlaces, {
          successActionCreator: setPizzaPlaces,
          failActionCreator: pizzaPlacesNotFound,
          args: [] as Parameters<typeof readPizzaPlaces>
        })
      );
    case getType(setPizzaPlaces):
      return {
        resource: action.payload
      };
    case getType(pizzaPlacesNotFound):
      return {
        errorMessage: 'Location not found'
      };
    default:
      return state;
  }
};

export default pizzaReducer;

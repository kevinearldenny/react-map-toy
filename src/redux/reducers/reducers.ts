import { combineReducers } from 'redux-loop';
import locationReducer, {
  initialState as initialLocationState,
  LocationState
} from './location';

import pizzaReducer, {
  initialState as initialPizzaState,
  PizzaPlaceState
} from './pizzaPlaces';

export interface State {
  readonly location: LocationState;
  readonly pizzaPlaces: PizzaPlaceState
}

export const initialState: State = {
  location: initialLocationState,
  pizzaPlaces: initialPizzaState
};

// Having separate reducers is a nice way to encapsulate you logic related to
// specific aspects of your app. Combining reducers doesn't make a whole lot of
// sense when you have only have one, but it should once you have multiple
// reducers.
export default combineReducers({
  location: locationReducer,
  pizzaPlaces: pizzaReducer
});

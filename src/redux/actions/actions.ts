import { WithDefaultActionHandling } from 'redux-loop';
import { ActionType } from 'typesafe-actions';

import * as locationActions from './location';
import * as pizzaActions from './pizzaPlaces';


export type LocationAction = ActionType<typeof locationActions>;
export type PizzaAction = ActionType<typeof pizzaActions>

// Only one type of action here for now, but as you have more types you'll want
// to use a union type to combine them (eg. type Action = TodoAction |
// FooAction)

export type Action = LocationAction | PizzaAction | WithDefaultActionHandling<LocationAction> | WithDefaultActionHandling<PizzaAction>;

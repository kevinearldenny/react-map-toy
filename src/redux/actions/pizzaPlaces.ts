import { createAction } from 'typesafe-actions';
import { PizzaPlace } from '../models';

export const getPizzaPlaces = createAction('Get Pizza Places')();
export const setPizzaPlaces = createAction('Set Pizza Places')<PizzaPlace[]>();
export const pizzaPlacesNotFound = createAction('Pizza places not found')<string>();

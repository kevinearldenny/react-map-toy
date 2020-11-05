import { createAction } from 'typesafe-actions';
import { CurrentLocation } from '../models';

export const getCurrentLocation = createAction('Get Current Location')();
export const setLocation = createAction('Set location')<CurrentLocation>();
export const locationNotFound = createAction('Location not found')<string>();

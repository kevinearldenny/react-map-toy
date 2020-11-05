import { JsonDecoder } from "ts.data.json";
import { PizzaPlace } from "../models";

const pizzaDecoder = JsonDecoder.object<PizzaPlace>(
  {
    id: JsonDecoder.number,
    name: JsonDecoder.string,
    address: JsonDecoder.string,
    latitude: JsonDecoder.number,
    longitude: JsonDecoder.number,
    has_slices: JsonDecoder.boolean,
    has_delivery: JsonDecoder.boolean,
    has_specialty_pizza: JsonDecoder.boolean,
    has_sit_down: JsonDecoder.boolean,
    yelp_link: JsonDecoder.string
  },
  "PizzaPlace"
);

export const pizzaPlacesDecoder = JsonDecoder.array<PizzaPlace>(pizzaDecoder, 'PizzaPlaces');
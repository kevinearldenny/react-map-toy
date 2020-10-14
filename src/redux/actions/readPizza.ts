import { PizzaPlace } from '../models';
import axios from "axios";
import { JsonDecoder } from "ts.data.json";
import { pizzaPlacesDecoder } from "../decoders/pizzaDecoder";

async function decodeResponse<T>(decoder: JsonDecoder.Decoder<T[]>, responseData: any): Promise<T[]> {
  return decoder.decodePromise(responseData);
}

export async function readPizzaPlaces(): Promise<PizzaPlace[]> {
  return new Promise((resolve, reject) => {
    axios
      .get("pizza_places.json")
      .then((response) => decodeResponse(pizzaPlacesDecoder, response.data).then(resolve).catch(reject))
      .catch((error) => reject(`Unable to fetch pizza places: ${error}`));
  });
}

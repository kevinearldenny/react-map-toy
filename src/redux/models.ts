export interface CurrentLocation {
  readonly latitude: number;
  readonly longitude: number;
}

export interface PizzaPlace {
  readonly id: number;
  readonly name: string;
  readonly address: string;
  readonly latitude: number;
  readonly longitude: number;
  readonly has_slices: boolean;
  readonly has_specialty_pizza: boolean;
  readonly has_sit_down: boolean;
  readonly has_delivery: boolean;
  readonly yelp_link: string;
}
import React from "react";
import "../index.css";
import { Map, Popup, TileLayer, GeoJSON, Circle } from "react-leaflet";
import pizzaData from "../data/philly_pizza.json";

export default class PizzaMap extends React.Component {
  componentDidMount() {
    const leafletMap = this.leafletMap.leafletElement;
    leafletMap.on("click", (e) => {
      const clickLoc = {
        coords: {
          latitude: e.latlng.lat,
          longitude: e.latlng.lng,
        },
      };
      this.props.mapClicked(clickLoc);
    });
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.location.latitude !== this.props.location.latitude ||
      prevProps.location.latitude !== this.location.latitude
    ) {
    }
  }

  pizzaPopup(feature, layer) {
    if (feature.properties) {
      layer.bindPopup(feature.properties.Name);
    }
  }

  render() {
    const position = [
      this.props.location.latitude,
      this.props.location.longitude,
    ];
    return (
      <div>
        <Map
          center={position}
          zoom={13}
          ref={(m) => {
            this.leafletMap = m;
          }}
        >
          <TileLayer
            url="http://stamen-tiles-{s}.a.ssl.fastly.net/toner-background/{z}/{x}/{y}.png"
            attribution='Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          />
          <Circle center={position} radius={100}>
            <Popup>Hey, that's me!</Popup>
          </Circle>
          <GeoJSON data={pizzaData} onEachFeature={this.pizzaPopup} />
        </Map>
      </div>
    );
  }
}

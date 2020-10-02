import React from "react";
import "../index.css";
import * as L from "leaflet";
import pizzaData from "../data/philly_pizza.json";

export default class Map extends React.Component {
  componentDidMount() {
    this.myMap = L.map("mapid");
    this.myMap.setView(
      [this.props.location.latitude, this.props.location.longitude],
      13
    );
    L.tileLayer(
      "http://stamen-tiles-{s}.a.ssl.fastly.net/toner-background/{z}/{x}/{y}.png",
      {
        attribution:
          'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 18,
      }
    ).addTo(this.myMap);

    const pizzaLayer = L.geoJSON(pizzaData, {
      onEachFeature: this.pizzaPopup,
    });
    pizzaLayer.addTo(this.myMap);

    this.addCurrentLocation();

    this.myMap.on("click", (e) => {
      // Format to match setLocation function
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
      this.updateCurrentLocation();
    }
  }

  updateCurrentLocation() {
    this.myMap.removeLayer(this.circle);
    this.addCurrentLocation();
  }

  addCurrentLocation() {
    this.circle = L.circle(
      [this.props.location.latitude, this.props.location.longitude],
      {
        color: "blue",
        fillColor: "#f03",
        fillOpacity: 0.5,
        radius: 100,
      }
    ).addTo(this.myMap);

    this.circle.bindPopup("Hey, that's me!");
  }

  pizzaPopup(feature, layer) {
    if (feature.properties) {
      layer.bindPopup(feature.properties.Name);
    }
  }

  render() {
    return (
      <div>
        <div id="mapid"></div>
      </div>
    );
  }
}

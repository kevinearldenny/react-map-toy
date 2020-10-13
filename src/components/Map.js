import React, { useEffect, useRef } from "react";
import "../index.css";
import * as L from "leaflet";

const Map = (props) => {
  const myMap = useRef(false);
  useEffect(() => {
    const myMap = L.map("mapid");
    L.tileLayer(
      "http://stamen-tiles-{s}.a.ssl.fastly.net/toner-background/{z}/{x}/{y}.png",
      {
        attribution:
          'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 18,
      }
    ).addTo(myMap);
  }, []);

  useEffect(() => {
    myMap.setView([props.location.latitude, props.location.longitude], 13);
    const circle = L.circle(
      [props.location.latitude, props.location.longitude],
      {
        color: "blue",
        fillColor: "#f03",
        fillOpacity: 0.5,
        radius: 100,
      }
    ).addTo(myMap);
    circle.bindPopup("Hey, that's me!");
  }, [props.location.latitude, props.location.longitude]);

  return (
    <div>
      <div id="mapid"></div>
    </div>
  );
};

export default Map;

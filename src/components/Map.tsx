import React, {useEffect, useRef} from 'react';
import { connect } from "react-redux";

import './Map.css';
import { State } from "../redux/reducers/reducers";

import {LocationState} from "../redux/reducers/location";
import {PizzaPlaceState} from "../redux/reducers/pizzaPlaces";

import {getCurrentLocation, setLocation} from "../redux/actions/location";
import {getPizzaPlaces} from "../redux/actions/pizzaPlaces";

import store from "../redux/store";
import * as L from 'leaflet';
import classNames from "classnames";
import { PizzaPlace } from "../redux/models";


interface StateProps {
    readonly location: LocationState;
    readonly pizzaPlaces: PizzaPlaceState;
}

const App = ({location, pizzaPlaces}: StateProps) => {
    const mapRef: any = useRef(null);
    const markerRef: any = useRef(null);

    // Get current location once on load
    useEffect(() => {
      store.dispatch(getCurrentLocation())
      store.dispatch(getPizzaPlaces())
  }, [])

    // Initialize the map on first load
    useEffect(() => {
        function onMapClick (d: L.LeafletMouseEvent) {
            const latlng = {
                latitude: d.latlng.lat,
                longitude: d.latlng.lng
            }
            store.dispatch(setLocation(latlng))
        }
        mapRef.current = L.map('mapid');
        L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/toner-background/{z}/{x}/{y}.png', {
            attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            maxZoom: 18}).addTo(mapRef.current);
        mapRef.current.on('click', onMapClick);
    }, [])

    // Add marker to map whenever location changes
    useEffect(() => {
        if (!("isPending" in location || "errorMessage" in location)) {
            if (!markerRef.current) {
                markerRef.current = L.circle([location.resource.latitude, location.resource.longitude], {
                    color: 'blue',
                    fillColor: '#f03',
                    fillOpacity: 0.5,
                    radius: 100
                }).addTo(mapRef.current);
            } else {
                markerRef.current.setLatLng([location.resource.latitude, location.resource.longitude])
            }
            markerRef.current.bindPopup("Hey, that's me!")
            mapRef.current.setView([location.resource.latitude, location.resource.longitude], 13);
        }
    }, [location])

    // Add pizza places to map
    useEffect(() => {
      function addPizzaToMap (p: PizzaPlace) {
        L.marker([p.latitude, p.longitude])
          .addTo(mapRef.current)
          .bindPopup(p.name);
      }
      if (!("isPending" in pizzaPlaces || "errorMessage" in pizzaPlaces)) {
        pizzaPlaces.resource.forEach(p => {
          addPizzaToMap(p)
        })
      }
    }, [pizzaPlaces])



  return (
    <div className="App">
      <header className="App-header">
        Pizza Map
      </header>
        <div className={classNames({
          hidden: ("isPending" in location) || ("errorMessage" in location)
        })}>
          <div id="mapid">
          </div>
        </div>

      !("isPending" in location || "errorMessage" in location) && <div id="map-loading">
        {"isPending" in location ? <span>Getting current location...</span> : <span id="error-msg">{location.errorMessage}</span>}
      </div>
    </div>
  );
}

function mapStateToProps(state: State): StateProps {
    return {
        location: state.location,
        pizzaPlaces: state.pizzaPlaces
    };
}

export default connect(mapStateToProps)(App);

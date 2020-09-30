import React from "react";
import '../index.css';
import * as L from 'leaflet'


export default class Map extends React.Component {

    componentDidMount() {
        const myMap = L.map('mapid')
        myMap.setView([this.props.location.latitude, this.props.location.longitude], 13);
        L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/toner-background/{z}/{x}/{y}.png', {
            attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            maxZoom: 18}).addTo(myMap);

        const circle = L.circle([this.props.location.latitude, this.props.location.longitude], {
            color: 'blue',
            fillColor: '#f03',
            fillOpacity: 0.5,
            radius: 100
        }).addTo(myMap);

        circle.bindPopup("Hey, that's me!")
    }

    render() {

        return (
            <div>
                <div id="mapid"></div>
            </div>
        );
    }
}
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Map from './components/Map'

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentLocation: {
                latitude: null,
                longitude: null
            }
        };

    }

    componentDidMount() {

        const setLocation = loc => {
            console.log(loc)
            this.setState({
                currentLocation: {
                    latitude: loc.coords.latitude,
                    longitude: loc.coords.longitude
                }
            })
        }

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(setLocation);
        }
    }

    render() {

        let mappanel;
        if (this.state.currentLocation.latitude) {
            mappanel = <Map location={this.state.currentLocation}/>
        } else {
            // If current location not loaded,
            mappanel = <div>Getting current location</div>
        }

        return (
            <div className="home-wrapper">
                <div className="title">
                    Pizza near you
                </div>
                {mappanel}
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <Home />,
    document.getElementById('root')
);

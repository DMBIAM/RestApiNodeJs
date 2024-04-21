import getOneEventsModels from '../../models/events/getOneEventsModels.js';
import mapboxSdk from '@mapbox/mapbox-sdk/services/geocoding.js';
import dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

const NearbyLocationsEventsController = {
  async search(req, res) {
    try {
        const nearbyEvents = [];
        const { MAPBOX_ACCESS_TOKEN } = process.env;
        const { id_event } = req.query;
        const event = await getOneEventsModels.getOneEvent(id_event);
        const { id, name, location, location_name } = event.data;
        const mapboxClient = mapboxSdk({ accessToken: MAPBOX_ACCESS_TOKEN });
        console.log("-----------------");
        console.log(event);
        console.log("-----------------");
        /*
            poi: Puntos de interés generales.
            poi.landmark: Puntos de interés específicos como monumentos o lugares históricos.
            address: Direcciones cercanas.
            place: Lugares cercanos como ciudades o pueblos.
        */
        const response = await mapboxClient.reverseGeocode({
            query: [location.y, location.x],
            types: [
                'region',
                'district',
                'place',
                'poi',
                'poi.landmark'
            ]
        }).send();

        const relevantInfo = response.body.features.map(feature => ({
            id: feature.id,
            type: feature.type,
            relevance: feature.relevance,
            name: feature.place_name,
            coordinates: feature.geometry.coordinates
        }));

        nearbyEvents.push({
            id: id,
            name: name,
            location: location,
            location_name: location_name,
            nearby_locations: relevantInfo
        });

        res.status(200).send({ status: 200, type: "Events", msg: "Event retrieved", data : nearbyEvents });
        return
    } catch (error) {
        if (error.status === 404) {
            res.status(404).send({ status: error.status, error: false, msg: "Event not found" });
        } else {
            console.log(error);
            res.status(500).send({ status: error.status, error: true, msg: "Internal Server Error, try again later" });
        }
        return;
    }
  }
};

export default NearbyLocationsEventsController;
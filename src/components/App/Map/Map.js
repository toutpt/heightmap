import { parse } from "../../../utils/parse";
import { useState, useEffect } from "preact/hooks";
import './Map.css';
import { lambert93ToWGS84 } from "../../../coordinate";

export function Map(props) {
    const [mapref, setMapRef] = useState({});
    const [xy, setxy] = useState([]);
    useEffect(() => {
        const entries = props.entries || [];
        if (mapref.map) {
            entries.forEach(entry => {
                const config = parse(entry.content);
                const coord = lambert93ToWGS84(config.xllcorner, config.yllcorner);
                debugger;
                if (mapref.geoJSON) {
                    mapref.geoJSON.remove();
                }
                mapref.map.setView(coord, 10);
                const data = {
                    "type": "FeatureCollection",
                    "features": [
                        {
                            "type": "Feature",
                            "geometry": {
                                "type": "Polygon",
                                "coordinates": [ coord, [coord[0], coord[1] + 0.5], [coord[0] + 0.5, coord[1] + 0.5], [coord[0] +0.5, coord[1]] ],
                            },
                        }
                    ],
                };
                console.log(JSON.stringify(data, null, 2));
                mapref.geoJSON = L.geoJSON(data).addTo(mapref.map);
                
            });
        } else {
            
            const mymap = L.map('leaflet').setView([51.505, -0.09], 13);
            const layer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(mymap);
            const geoJSON = L.geoJSON().addTo(mymap);
            console.log({geoJSON})
            setMapRef({
                map: mymap,
                layer,
                geoJSON,
            });
        }
    }, [props.entries]);
    
    return (
        <div>
            <div id="leaflet" />
        </div>
    );
}
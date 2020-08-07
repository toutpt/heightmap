import { parse } from "../../../utils/parse";
import { useState, useEffect } from "preact/hooks";
import './Map.css';
import { lambert93ToWGS84 } from "../../../coordinate";


const PLUS_LAT = 0.03;
const PLUS_LON = 0.02;

export function Map(props) {
    const [mapref, setMapRef] = useState({});
    const [xy, setxy] = useState([]);
    useEffect(() => {
        const entries = props.entries || [];
        if (mapref.map) {
            mapref.geoJSON.forEach(g => g.remove());
            mapref.geoJSON = [];
            entries.forEach(entry => {
                const config = parse(entry.content);
                const coord = lambert93ToWGS84(config.xllcorner, config.yllcorner);
                mapref.map.setView(coord, 10);
                const data = {
                    "type": "FeatureCollection",
                    "features": [
                        {
                            "type": "Feature",
                            "properties": {},
                            "geometry": {
                                "type": "Polygon",
                                "coordinates": [[
                                    [coord[1], coord[0]],
                                    [coord[1], coord[0] + PLUS_LON],
                                    [coord[1] + PLUS_LAT, coord[0] + PLUS_LON],
                                    [coord[1] + PLUS_LAT, coord[0]],
                                    [coord[1], coord[0]]
                                ]],
                            },
                        }
                    ],
                };
                console.log(JSON.stringify(data));
                mapref.geoJSON.push(L.geoJSON(data).addTo(mapref.map));
            });
        } else {
            
            const mymap = L.map('leaflet').setView([51.505, -0.09], 13);
            const layer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(mymap);
            setMapRef({
                map: mymap,
                layer,
                geoJSON: [],
            });
        }
    }, [props.entries]);
    
    return (
        <div>
            <div id="leaflet" />
        </div>
    );
}
import { parse } from "../../../utils/parse";
import { useState, useEffect } from "preact/hooks";
import './Map.css';

export function Map(props) {
    const [mapref, setMapRef] = useState();
    const [xy, setxy] = useState([]);
    useEffect(() => {
        const entries = props.entries || [];
        const config = entries.reduce((acc, entry) => {
            const config = parse(entry.content);
            if (!acc.x || acc.x > config.xllcorner) {
                acc.x = config.xllcorner;
            }
            if (!acc.y || acc.y > config.yllcorner) {
                acc.y = config.yllcorner;
            }
            return acc;
        }, {});
        if (mapref) {
            /**
             * xllcorner    549987.500000000000
             * yllcorner    6250012.500000000000
             */
            setxy([config.x, config.y]);
            // TODO: config.setView()
        } else {
            const mymap = L.map('leaflet').setView([51.505, -0.09], 13);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(mymap);
            setMapRef(mymap);
        }
    }, [props.entries]);
    
    return (
        <div>
            {xy.join(', ')}
            <div id="leaflet" />
        </div>
    );
}
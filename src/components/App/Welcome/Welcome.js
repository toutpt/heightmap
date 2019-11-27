import { useState, useEffect } from 'preact/hooks';
import { FileInput } from '../FileInput/FileInput';
import { Image } from '../Image/Image';
import { useApp } from '../../../state';
import { Map } from '../Map/Map';

export function Welcome() {
    const [entries, setEntries] = useState([]);
    useApp({
        onChange(app) {
            setEntries(app.entries);
        },
    })
    return (
        <div id="content">
            <h1>From DB Alti to HeightMap</h1>
            <p>To start you can select the files from your dbalti you want to transform into heightmap. Only the ".asc" extension is supported </p>
            <p>The asc form is a text file which start with one param per line then one line per row of data.</p>
            <form>
                <FileInput />
                <Map entries={entries} />
                {entries.map(entry => (
                    <Image key={entry.name} entry={entry} />
                ))}
                
            </form>
        </div>
    );
}
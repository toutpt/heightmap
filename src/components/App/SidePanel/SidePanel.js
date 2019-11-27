import './SidePanel.css';
import { useState } from 'preact/hooks';
import { useApp, selectEntry } from '../../../state';

export function SidePanel() {
    const [entries, setEntries] = useState([]);
    useApp({
        onChange: app => {
            setEntries(app.getEntries());
        },
    });
    function onClick(entry) {
        selectEntry(entry);
    }
    return (
        <nav id="side-panel">
            <ul>
                {entries.map(e => (
                    <li>
                        <button class="side-panel-item" onClick={() => onClick(e)}>{e.name}</button>
                    </li>
                ))}
            </ul>
        </nav>
    )
}
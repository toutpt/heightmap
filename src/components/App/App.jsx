
import './App.css'
import { HeaderBar } from './HeaderBar/HeaderBar';
import { SidePanel } from './SidePanel/SidePanel';
import { Welcome } from './Welcome/Welcome';

const defaultValue = `

`


export default function App() {
	return (
		<div id="app">
			<HeaderBar />
			<SidePanel />
			<Welcome />
		</div>
	)
}

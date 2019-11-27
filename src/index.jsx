import { render } from 'preact'

if (process.env.NODE_ENV === 'development') {
  require('preact/debug');
}

let mount
const root = document.getElementById('root')
const load = async () => {
  const { default: App } = await import('./components/App/App')

  mount = render(<App />, root, mount)
}

// This is needed for Hot Module Replacement
if (module.hot) {
  module.hot.accept('./components/App/App', () => requestAnimationFrame(load))
}

load()

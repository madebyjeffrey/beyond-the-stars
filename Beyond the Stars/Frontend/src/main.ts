import { mount } from 'svelte'
import './app.css'
import App from './App.svelte'
import 'es-iterator-helpers/auto';

const app = mount(App, {
  target: document.getElementById('app')!,
})

export default app

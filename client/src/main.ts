import { createApp } from 'vue'
import App from './App.vue'
import '@fontsource/work-sans/variable.css';
import '@fontsource/fira-sans/latin.css'
import '@inkline/inkline/inkline.scss';
import './main.css';
import { Inkline, components } from '@inkline/inkline';

const app = createApp(App)

app.use(Inkline, {components})

app.mount('#app')
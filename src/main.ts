import { createApp } from 'vue'
import store from './store'
import App from './App.vue'
import './plugins/axios'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import router from './router'

loadFonts()

const app=createApp(App);
app.use(router)
.use(vuetify)
.use(store)
.mount('#app');


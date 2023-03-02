import { createApp } from 'vue'
//원래는 './store/index.js'로 가져와야 하지만 index.js는 파일명 생략해도 됨
// import store from './store'
import { createPinia } from 'pinia'
import App from './App.vue'
import './plugins/axios'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import router from './router'
import piniaPluginPersistedState from "pinia-plugin-persistedstate"

loadFonts()

const app=createApp(App);
app.use(router)
.use(vuetify)
.use(createPinia().use(piniaPluginPersistedState))
.mount('#app');


import './assets/main.css'
import './index.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import phoneNumber from './directives/phoneNumber'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.directive('phone-number', phoneNumber)

app.mount('#app')

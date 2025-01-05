import { createApp } from 'vue'
import { router } from './router'
import { Quasar } from 'quasar'
import quasarLang from 'quasar/lang/ru'
import { VueQueryPlugin } from '@tanstack/vue-query'
import './style.css'
import App from './App.vue'

import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/dist/quasar.css'

const myApp = createApp(App)

myApp.use(router)

myApp.use(Quasar, {
    plugins: {},
    lang: quasarLang,
})

myApp.use(VueQueryPlugin)

myApp.mount('#app')
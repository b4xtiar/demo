// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import {
  store
} from './store'
import VueCookies from 'vue-cookies'
import Vuetify from 'vuetify'
import SequentialEntrance from 'vue-sequential-entrance'
import 'vue-sequential-entrance/vue-sequential-entrance.css'
Vue.use(SequentialEntrance);
import {
  LMap,
  LTileLayer,
  LMarker,
  LIcon
} from 'vue2-leaflet';
import {
  Icon
} from 'leaflet'

import 'leaflet/dist/leaflet.css'

import 'material-design-icons-iconfont/dist/material-design-icons.css'

import VueParticles from 'vue-particles'
Vue.use(VueParticles)

Vue.component('l-map', LMap);
Vue.component('l-tile-layer', LTileLayer);
Vue.component('l-marker', LMarker);
Vue.component('l-icon', LIcon);

delete Icon.Default.prototype._getIconUrl;

Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

import vPlayBack from 'v-playback';
Vue.use(vPlayBack);
import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader

//             accessToken: 'pk.eyJ1IjoiYjR4dGlhciIsImEiOiJjanRhY2FwZ3YwOWRxNDlxZHZ5Y3ppOXZ0In0.jcBfGgASqNjja-CuN2Q5WA', // sk.eyJ1IjoiYjR4dGlhciIsImEiOiJjankxYXF2YWIwNmN2M2NrMmowbjIzanY2In0.qpG7x98x9SBfb-LCVBzWIA

Vue.use(Vuetify)

Vue.use(store)
Vue.use(VueCookies)
Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})

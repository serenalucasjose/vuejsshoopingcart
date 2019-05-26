import Vue from 'vue'
import App from './App'
import store from '@/store/index'
import {currency} from '@/currency'
import BootstrapVue from 'bootstrap-vue'

// Import Bootstrap Vue files
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.filter('currency', currency)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  render: h => h(App)
})

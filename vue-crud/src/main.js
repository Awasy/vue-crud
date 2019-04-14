import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

import AddProduct from './components/AddProduct.vue'
import EditProduct from './components/EditProduct.vue'
import TableProducts from './components/TableProducts.vue'
import ShowProduct from './components/ShowProduct.vue'


import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'jquery/dist/jquery.slim.min.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import '../css/site.css'

Vue.use(BootstrapVue);
Vue.use(VueAxios, axios)

Vue.component('addProduct', AddProduct);
Vue.component('editProduct', EditProduct);
Vue.component('tableProducts', TableProducts);
Vue.component('showProduct', ShowProduct);


new Vue({
  el: '#app',
  render: h => h(App)
})

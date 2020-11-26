import Vue from 'vue'
import App from './App.vue'
import VueMaterial from 'vue-material'
import { MdCard, MdField, MdContent } from 'vue-material/dist/components';
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default.css'

Vue.use(VueMaterial)
Vue.use(MdContent);
Vue.use(MdCard);
Vue.use(MdField);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')


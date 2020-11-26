import Vue from 'vue'
import App from './App.vue'
import VueMaterial from 'vue-material'
import { MdContent, MdCard, MdButton } from 'vue-material/dist/components';

Vue.use(VueMaterial)
Vue.use(MdContent);
Vue.use(MdCard);
Vue.use(MdButton);
// MdTitle breaks

//Vue.use(MdCardFooter);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')


/*
import Vue from 'vue'
import App from './App.vue'
import VueMaterial from 'vue-material'
import { MdField, MdButton, MdContent, MdCard, MdCardFooter, MdList, MdCheckbox } from 'vue-material/dist/components';
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default.css';

Vue.use(MdField);
Vue.use(MdButton);
Vue.use(MdContent);
Vue.use(MdCard);
Vue.use(MdCardFooter);
Vue.use(MdList);
Vue.use(MdCheckbox);
//Vue.use(MdNotification);
//Vue.use(MdApp)

Vue.use(VueMaterial)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')*/

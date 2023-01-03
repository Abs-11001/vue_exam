import Vue from 'vue'
import {Button, Card, Message, Dialog} from "element-ui";
import App from './App.vue'
import router from './router/index'

Vue.config.productionTip = false
Vue.use(Button)
Vue.use(Dialog)
Vue.use(Card)
Vue.prototype.$message = Message

new Vue({
  render: h => h(App),
  router
}).$mount('#app')

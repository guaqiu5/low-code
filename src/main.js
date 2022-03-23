import Vue from 'vue'
import App from './App.vue'
import textCompApi from './utils/textInstall'
Vue.config.productionTip = false
Vue.use(textCompApi)

new Vue({
  render: h => h(App),
}).$mount('#app')
                                     
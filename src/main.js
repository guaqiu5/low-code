import Vue from 'vue'
import App from './App.vue'
import textCompApi from './utils/textInstall'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
Vue.config.productionTip = false
Vue.use(textCompApi)
Vue.use(ElementUI)

new Vue({
  render: h => h(App),
}).$mount('#app')
                                     
import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 初始化样式
import 'normalize.css'
// 引入Element
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

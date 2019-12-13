// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)
import "./assets/reset.css"
import qs from 'qs';
Vue.prototype.$qs = qs;

Vue.config.productionTip = false;
import Filters from './filter'
for (var i in Filters) {
  Vue.filter(i, Filters[i])
}

axios.interceptors.response.use(response => {
  console.log("------------请求数据回来啦" + response.config.url + "--------------");
  console.log(response);
  console.log("-------over--------");
  if (response.data.code == -1) {
    router.replace('/login')
    return
  }
  return response
})

router.beforeEach((to,from,next)=>{
  if(to.path=='/login'){
    next();
    return;
  }
  if(!(localStorage.getItem('isAdmin'))){
    next('/login');
    return;
  }
  next()
})

Vue.prototype.$axios = axios
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})

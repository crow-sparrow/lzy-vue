import Vue from 'vue'
import Router from 'vue-router'

const login = () => import('../pages/login.vue')
const index = () => import('../pages/index.vue')
const welcome = () => import('../pages/welcome.vue')
const manage = () => import('../pages/manage.vue')
const teacher = () => import('../pages/teacher.vue')
const clean = () => import('../pages/clean.vue')
const fix = () => import('../pages/fix.vue')
const reset = () => import('../pages/reset.vue')
const banner = () => import('../pages/banner.vue')
const water = () => import('../pages/water.vue')

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/login',
      component: login
    },
    {
      path: '/index',
      component: index,
      children: [{
          path: 'welcome',
          component: welcome
        },
        {
          path: 'manage',
          component: manage,
          name: '管理员管理',
          beforeEnter: (to, from, next) => {
            if (localStorage.getItem('isAdmin') == 0) {
              console.log('1');

              next();
              return
            }
            if (localStorage.getItem('isAdmin') == 1) {
              next('/index/welcome')
              console.log('2');

            }
          }
        },
        {
          path: 'teacher',
          component: teacher,
          name: '家教管理',
          beforeEnter: (to, from, next) => {
            if (localStorage.getItem('isAdmin') == 1) {
              console.log('1');
              next();
              return
            }
            if (localStorage.getItem('isAdmin') == 0) {
              next('/index/welcome')
              console.log('2');

            }
          }
        },
        {
          path: 'fix',
          component: fix,
          name: '维修管理',
          beforeEnter: (to, from, next) => {
            if (localStorage.getItem('isAdmin') == 1) {
              console.log('1');
              next();
              return
            }
            if (localStorage.getItem('isAdmin') == 0) {
              next('/index/welcome')
              console.log('2');

            }
          }
        },
        {
          path: 'clean',
          component: clean,
          name: '家政管理',
          beforeEnter: (to, from, next) => {
            if (localStorage.getItem('isAdmin') == 1) {
              console.log('1');
              next();
              return
            }
            if (localStorage.getItem('isAdmin') == 0) {
              next('/index/welcome')
              console.log('2');

            }
          }
        },
        {
          path: 'water',
          component: water,
          name: '水站管理',
          beforeEnter: (to, from, next) => {
            if (localStorage.getItem('isAdmin') == 1) {
              console.log('1');
              next();
              return
            }
            if (localStorage.getItem('isAdmin') == 0) {
              next('/index/welcome')
              console.log('2');

            }
          }
        },
        {
          path: 'reset',
          component: reset,
          name: '修改密码',
          beforeEnter: (to, from, next) => {
            if (localStorage.getItem('isAdmin') == 1) {
              console.log('1');
              next();
              return
            }
            if (localStorage.getItem('isAdmin') == 0) {
              next('/index/welcome')
              console.log('2');

            }
          }
        },
        {
          path: 'banner',
          component: banner,
          name: '轮播图管理',
          beforeEnter: (to, from, next) => {
            if (localStorage.getItem('isAdmin') == 1) {
              console.log('1');
              next();
              return
            }
            if (localStorage.getItem('isAdmin') == 0) {
              next('/index/welcome')
              console.log('2');

            }
          }
        },
        {
          path: '',
          redirect: 'welcome'
        },
      ]
    },
    {
      path: '*',
      redirect: '/login'
    }
  ]
})

import Vue from 'vue'
import Router from 'vue-router'
//admin

import AdminLogin from '@/components/admin/Login'
import AdminHome from '@/components/admin/Home'
import Dukans from '@/components/admin/Dukans'
import Dukan from '@/components/admin/Dukan'
import Data from '@/components/admin/Data'

import VueCookies from 'vue-cookies'
Vue.use(VueCookies)
Vue.use(Router)



const router = new Router({
  mode : 'history',
  routes: [
    
    {
      path: '/admin/login',
      name: 'AdminLogin',
      component: AdminLogin,
      meta:{
        title:'بەڕێوبەر -چونەژورەوە'
      }
    },
    {
      path: '/admin/',
      name: 'AdminHome',
      component: AdminHome,
      meta:{
        adminSecure : true,
        title:'بەڕێوبەر -سەرەکی'
      }
    },
    {
      path: '/admin/dukans',
      name: 'Dukans',
      component: Dukans,
      meta:{
        adminSecure : true,
        title:'نۆد'
      }
    },
    {
      path: '/admin/data',
      name: 'Data',
      component: Data,
      meta:{
        adminSecure : true,
        title:'نۆد'
      }
    },
    {
      path: '/admin/dukan/:id',
      name: 'Dukan',
      component: Dukan,
      meta:{
        adminSecure : true,
        title:'نۆد'
      }
    },
  ]
})


router.beforeEach((to , from , next) =>{
  document.title = to.meta.title || 'تایتڵ';
    if(to.matched.some(rec => rec.meta.adminSecure)){
      if($cookies.isKey('ad')){
        next()
      }else{
        next({name:'AdminLogin'})
      }
    }else{
      next()
    }
    
})

export default router

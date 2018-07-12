import Vue from 'vue'
import Router from 'vue-router'
import goods  from '@/views/GoodList'
import titles from '@/views/Title'
import Imgs   from '@/views/image'
import logins from '@/views/login'
import Cart   from '@/views/Cart'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/goods',
      name: 'goods',
      component: goods,
      children:[
        {
          path: '/goods/image',
          name: 'Imgs',
          component: Imgs
        },
        {
          path: '/goods/title',
          name: 'titles',
          component: titles
        }
      ]
    },
    {
      path: '/login',
      name: 'logins',
      component: logins
    },
    {
      path: '/',
      name: 'goods',
      component: goods
    },
    {
      path: '/Cart',
      name: 'Cart',
      component: Cart
    }
  ]
})

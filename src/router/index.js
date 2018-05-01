import Vue from 'vue'
import Router from 'vue-router'
import headers from '@/components/header'
import index from '@/view/index'
import prolist from '@/view/prolist'
import car from '@/view/car'
import productshow from '@/view/productshow'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
      children:[
      	{
      		path: '/',
		      name: 'prolist',
		      component: prolist,
      	},
      	{
      		path: '/car',
		      name: 'car',
		      component: car,
      	},
      	{
      		path: '/productshow/:id',
		      name: 'productshow',
		      component: productshow,
      	}
      ]
    }
  ]
})

import Vue from 'vue'
import VueRouter from 'vue-router'
import Map from '@/components/mapComponent.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Map
  }
]

const router = new VueRouter({
  routes
})

export default router

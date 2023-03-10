import Vue from 'vue'
import VueRouter from 'vue-router'
import Map from '@/components/mapComponent.vue'
import Search from '@/components/search.vue'

Vue.use(VueRouter)

const routes = [
  /* {
    path: '/',
    name: 'home',
    component: Map
  }, */
  {
    path: '/',
    name: 'search',
    component: Search
  }
]

const router = new VueRouter({
  routes
})

export default router

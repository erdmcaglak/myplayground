import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Welcome from "@/views/Welcome.vue"
import Calculator from "@/views/Calculator.vue"
import PasswordCreator from "@/views/PasswordCreator.vue"

const routes = [
  {
    path:'/',
    name:"Welcome",
    component:Welcome
  },
  {
    path:'/calculator',
    name:"Welcome",
    component:Calculator
  },
  {
    path:'/password-creator',
    name:"PasswordCreator",
    component:PasswordCreator
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

<template>
  <div>
    <nav-header></nav-header>
    <nav-bread>
      <span>carts</span>
    </nav-bread>
    <div class="carts">
      购物车
    </div>
    <nav-footer></nav-footer>
  </div>
  </template>
  
  <script>
  // import goodlist from './GoodList.vue'
  import NavHeader from '@/components/NavHeader'
  import NavFooter from '@/components/NavFooter'
  import NavBread from '@/components/NavBread'  
  export default {
    
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },
    components: {
      NavHeader,
      NavFooter,
      NavBread
    },
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
 
  </style>
  
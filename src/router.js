import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import About from './views/About.vue';
import Product from './views/Product.vue';

Vue.use(Router);

export default new Router({
  // use history mode to leverage history.pushState API and remove '#' from URL
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/products/:sku',
      name: 'product',
      component: Product
    }
  ]
});

# Reduced Test Case for VueSlack Question: Dynamic Routing with AJAX

## Vue App Setup (with Vue Cli 3)

```bash
yarn global install @vue/cli

vue create fetch-for-dynamic-route

? Please pick a preset: Manually select features

? Check the features needed for your project: Babel, Router

? Where do you prefer placing config for Babel, PostCSS, ESLint, etc.? In packag
e.json

? Save this as a preset for future projects? No

? Pick the package manager to use when installing dependencies: Yarn

cd fetch-for-dynamic-route
```

## Create an API for testing

- Install `json-server`

```bash
yarn add json-server

touch db.json
```

- Create `db.json`

```json
// db.json
{
  "products": [
    { "id": 1, "name": "cup", "sku": "CUP999" },
    { "id": 2, "name": "bowl", "sku": "BOWL222" },
    { "id": 3, "name": "spoon", "sku": "SPOON111" }
  ]
}
```

- Add a script to `package.json` to run `json-server`

```json
// package.json

{
  // ...other package.json content
  "scripts": {
    // ...other default scripts
    "start:api": "json-server db.json --watch --port 4000"
  }
}
```

- Start the API server

```bash
npm run start:api
```

- You now have a REST endpoint at `http://localhost:4000/products` with full CRUD (Create Read Update Delete) functionality

## Create the Route and View Component

- Create a dynamic route with Vue Router

````js
// src/router.js
import Vue from 'vue';
import Router from 'vue-router';
// ... other imports
import Product from './views/Product.vue';

Vue.use(Router);

export default new Router({
  // use history mode to leverage history.pushState API and remove '#' from URL
  mode: 'history',
  routes: [
// ...other routes
    {
      path: '/products/:sku',
      name: 'product',
      component: Product
    }
  ]
});


* Create the component

```bash
touch src/views/Product.vue
````

```html
<!--src/views/Product.vue-->
<template>
    <div>
        <h1>Product: </h1>
        <p>Product Sku: </p>
    </div>
</template>
```

## Fetch the Data from the API and Use it to Render the Template

- Install axios

```bash
yarn add axios
```

- Create a method for fetching the data
- Call the method from the `Created()` lifecycle hook, getting the `sku` off the `$route.params` object (use Vue dev tools browser plugin to verify)
- Inside the success callback of the request chained `then` method, set `product` in the component to the response.data[0] object
- Handle any errors inside the chained request `catch` method
- Update the template to only display the product data if it is truthy (not null) using `v-if`; otherwise, display loading or an error.
- Update the template to use the component

```html
<template>
<div>
    <div v-if="product">
        <h1>Product: {{product.name}}</h1>
        <p>Product SKU: {{product.sku}}</p>
    </div>
    <div v-else>
        <h1 v-if="loading">Loading Product...</h1>
        <h1 v-else>Error: Cannot find that product.</h1>
    </div>
</div>
</template>
<script>
import axios from 'axios';
export default {
    data(){
        return {
            product: null,
            loading: false
        }
    },

    created(){
        this.fetchProduct(this.$route.params.sku);
    },

    methods: {
        fetchProduct(sku){
            // do not hard code api URI in production
            const apiURI = 'http://localhost:4000/products';
            // query api by sku
            // destructure data from response object

            this.loading = true;
            axios.get(`${apiURI}?sku=${sku}`).then(({data}) =>{
                // promise returns an array, get the first item
                // set component data
                this.product = data[0]
                this.loading = false;
            }
            )
            .catch(error => {
                // for testing: check the console
                console.log(error);
                this.loading = false;
            })
        }
    }
}
</script>
```

- Start the development server

```bash
yarn serve
```

- Navigate to `http://localhost:8080/products/CUP999` to test manually

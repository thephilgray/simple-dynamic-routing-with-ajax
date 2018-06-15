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

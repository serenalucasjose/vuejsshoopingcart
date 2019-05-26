<template>
    <div id="products-list">
        <b-card bg-variant="dark" text-variant="white" title="Our Products"></b-card>
        <div class="products-spinner d-flex justify-content-center align-items-center mb-3" v-if="loading">
            <b-spinner variant="primary" label="Loading..."></b-spinner>
        </div>
        <ul class="products-list" v-else>
            <li v-for="product in products" :key="product.id">
                <b-card no-body class="overflow-hidden product-card" style="max-width: 540px;">
                    <b-row no-gutters>
                    <b-col md="6">
                        <b-card-img :src="product.imageUrl" class="rounded-0"></b-card-img>
                    </b-col>
                    <b-col md="6">
                        <b-card-body :title="product.title">
                            <b-card-text>
                                Price: {{ product.price | currency }}
                                <hr/>
                                In Stock: {{ product.inventory }}
                            </b-card-text>
                            <b-button 
                                @click="addProductToCart(product)"
                                block 
                                variant="primary">Add to cart</b-button>
                        </b-card-body>
                    </b-col>
                    </b-row>
                </b-card>
            </li>

        </ul>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                loading: false
            }
        },
        computed: {
            products() {
                return this.$store.getters.availableProducts
            }
        },
        methods: {
            addProductToCart(product) {
                this.$store.dispatch('addProductToCart', product)
            }
        },
        created() {
            this.loading = true
            this.$store.dispatch('fetchProducts')
                .then(()=> this.loading = false)
        }
    }
</script>

<style lang="scss" scoped>
    .products-spinner {
        min-height: calc(100vh - 120px);
        height: 100%;
        margin: 1rem;
    }
    .products-list {
        list-style: none;
        padding: 0;
        margin: 1rem 0;
        li {
            box-sizing: content-box;
            margin: 0 0 1rem 0;
        }
    }
    .product-card {
        max-width: 540px;
        max-height: 250px;
        img {
            height: 200px;
            width: auto;
            margin: calc(100% - 245px) auto;
            display: block;
            padding: 1rem;
            box-sizing: border-box;
        }
    }
</style>

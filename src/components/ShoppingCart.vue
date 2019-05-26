<template>
    <div id="shopping-cart">
        <b-card bg-variant="dark" text-variant="white" title="My Cart"></b-card>
        <b-list-group class="cart-list">
            <b-list-group-item v-for="product in products" :key="product.id">
                {{product.title}} - {{product.price | currency}} - {{product.quantity}}
            </b-list-group-item>
            <b-list-group-item active>Total: {{total | currency}}</b-list-group-item>
        </b-list-group>
        <b-button 
            @click="doCheckout()"
            block 
            variant="primary">Checkout</b-button>
        <b-alert
            class="cart-alert"
            :show="$store.state.checkoutStatus"
            dismissible
            :variant="($store.state.checkoutStatus === 'success') ? 'info' : 'danger'">
            <p>{{ checkoutMsg }}</p>
        </b-alert>
    </div>
</template>

<script>
    export default {
        computed: {
            products() {
                return this.$store.getters.cartProducts
            },
            total() {
                return this.$store.getters.cartTotal
            },
            checkoutMsg() {
                return this.$store.getters.checkoutMsg
            }
        },
        methods: {
            doCheckout() {
                this.$store.dispatch('checkout')
                    .then(()=> {
                        console.log('succes!')
                    })
                    .catch(error => {
                        console.log('error!')
                    })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .cart-list {
        margin: 1rem 0;
    }
    .cart-alert {
        margin: 1rem 0 0;
    }
</style>

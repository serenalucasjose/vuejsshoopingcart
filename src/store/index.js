import Vue from 'vue'
import Vuex from 'vuex'
import shop from '@/api/shop'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        products: [],
        cart: [],
        checkoutStatus: null,
        checkoutMsg: ''
    },
    getters: {
        availableProducts(state, getters) {
            return state.products.filter((product) => {
                return product.inventory > 0
            })
        },
        cartProducts(state) {
            return state.cart.map(cartItem => {
                const product = state.products.find(product => product.id === cartItem.id)
                
                return {
                    title: product.title,
                    price: product.price,
                    quantity: cartItem.quantity
                }
            })
        },
        cartTotal(state, getters) {
            return getters.cartProducts.reduce((total, product) => total += product.price * product.quantity, 0)
        },
        checkoutMsg(state) {
            return state.checkoutMsg
        }
    },
    actions: {
        checkout({state, commit}) {
            return new Promise((resolve, reject) => {
                shop.buyProducts(
                    state.cart,
                    () => {
                        commit('emptyCart')
                        commit('setChekoutStatus', 'success')
                        commit('setCheckoutMsg', 'Your purchase was successful!')
                        resolve()
                    },
                    () => {
                        commit('setChekoutStatus', 'fail')
                        commit('setCheckoutMsg', 'Oops! Something went wrong :(')
                        reject()
                    }
                )
            })
        },
        fetchProducts({commit}) {
            return new Promise((resolve, reject) => {
                shop.getProducts(products => {
                    commit('setProducts', products)
                    resolve()
                })
            })
        },
        addProductToCart(context, product) {
            if (product.inventory > 0) {
                const cartItem = context.state.cart.find(item => item.id === product.id)

                if(!cartItem) {
                    context.commit('pushProductToCart', product.id)
                } else {
                    context.commit('incrementItemQuantity', cartItem)                    
                }

                context.commit('decrementProductInventory', product)

            } else {
                // Show the "Not in stock" message 
            }
        }
    },
    mutations: {
        setProducts(state, products) {
            state.products = products
        },
        pushProductToCart(state, productId) {
            state.cart.push({
                id: productId,
                quantity: 1
            })
        },
        incrementItemQuantity(state, cartItem) {
            cartItem.quantity++
        },
        decrementProductInventory(state, product) {
            product.inventory--
        },
        setChekoutStatus(state, status) {
            state.checkoutStatus = status
        },
        emptyCart(state) {
            state.cart = []
        },
        setCheckoutMsg(state, msg) {
            state.checkoutMsg = msg
        }
    }
})

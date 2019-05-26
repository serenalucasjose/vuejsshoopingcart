<template>
  <div id="app">
    <section class="components-container">
      <b-container>
        <b-row class="justify-content-md-center">
          <ProductList/>
          <ShoppingCart/>
        </b-row>
      </b-container>
    </section>
  </div>
</template>

<script>
import ProductList from './components/ProductList'
import ShoppingCart from './components/ShoppingCart'

export default {
  name: 'app',
  components: {
    ProductList,
    ShoppingCart
  }
}
</script>

<style lang="scss">
  html {
    height: 100%;
  }

  #app {
    min-height: 100vh;
  }

  body {
    min-height: 100%;
  }

  #app {
    background: #ecf0f1;
  }

  .components-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
    padding: 1rem;
    margin: 0 auto;
    min-height: 100vh;
    
    .container {
      min-height: 100vh;
      .row {
        min-height: 100vh;
      }
    }

    #products-list,
    #shopping-cart {
      margin: 0 1rem;
      min-height: 100vh;
      height: 100%;
      .card-title {
        margin: 0;
      }
    }

    #products-list {
      min-width: 540px;
    }

    #shopping-cart {
      min-width: 296px;
    }
  }
</style>

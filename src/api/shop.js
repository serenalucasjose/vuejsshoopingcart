/**
 * Mocking client-server processing
 */
const _products = [
    {"id": 1, "title": "iPad 4 Mini", "price": 500.01, "inventory": 2, "imageUrl": "https://http2.mlstatic.com/apple-ipad-97-wi-fi-2018-model-6th-generation-a1893-stock-D_NQ_NP_830368-MLA27550238087_062018-F.jpg"},
    {"id": 2, "title": "H&M T-Shirt White", "price": 10.99, "inventory": 10, "imageUrl": "https://i.ebayimg.com/00/s/NTQ0WDM4OA==/z/d9MAAOSwt5tZ0mZq/$_86.JPG"},
    {"id": 3, "title": "Coldplay - Viva la vida CD", "price": 19.99, "inventory": 5, "imageUrl": "https://www.vinyldestination.com.au/assets/full/4670909.jpg"}
  ]
  
  export default {
    getProducts (cb) {
      setTimeout(() => cb(_products), 1500)
    },
  
    buyProducts (products, cb, errorCb) {
      setTimeout(() => {
        // simulate random checkout failure.
        (Math.random() > 0.5 || navigator.userAgent.indexOf('PhantomJS') > -1)
          ? cb()
          : errorCb()
      }, 100)
    }
  }
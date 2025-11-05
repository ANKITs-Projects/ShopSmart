import { configureStore } from '@reduxjs/toolkit'
import productsReducer from './slices/productsSlice'
import cartReducer from './slices/cartSlice'


const store = configureStore({
reducer:{
products: productsReducer,
cart: cartReducer
}
})


let prev =store.getState().cart
store.subscribe(()=>{
const cur =store.getState().cart
if (cur !== prev) {
localStorage.setItem('shopsmart_cart_v1', JSON.stringify(cur))
prev =cur
}
})


export default store
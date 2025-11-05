import React from 'react';
import { useDispatch } from 'react-redux'
import { addToCart } from '../slices/cartSlice'


export default function ProductCard({ product }){
const dispatch = useDispatch()


return (
<div className="border rounded-lg shadow-sm p-4 flex flex-col items-center bg-white">
<img src={product.image} alt={product.title} className="w-32 h-32 object-contain mb-2" />
<h3 className="text-sm font-semibold text-center line-clamp-2">{product.title}</h3>
<p className="font-bold text-blue-600 mt-2">₹{product.price}</p>
<button
onClick={()=>dispatch(addToCart(product))}
className="mt-3 bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded"
>
Add to cart
</button>
</div>
)
}
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateQuantity, removeFromCart, clearCart } from '../slices/cartSlice';


export default function CartPage() {
const items = useSelector((s) => s.cart.items);
const dispatch = useDispatch();
const entries = Object.values(items);
const totalItems = entries.reduce((s, e) => s + e.qty, 0);
const totalPrice = entries.reduce((s, e) => s + e.qty * e.product.price, 0);


if (entries.length === 0) return <h1 className="text-xl font-semibold">Your cart is empty</h1>;


return (
<div>
<h1 className="text-2xl font-bold mb-4">Cart</h1>
<div className="space-y-4">
{entries.map((e) => (
<div key={e.product.id} className="flex items-center gap-4 border-b pb-2">
<img src={e.product.image} alt="" className="w-16 h-16 object-contain" />
<div className="flex-1">
<h3 className="font-semibold">{e.product.title}</h3>
<p>₹{e.product.price}</p>
<div className="flex items-center gap-2 mt-1">
<button onClick={() => dispatch(updateQuantity({ id: e.product.id, qty: e.qty - 1 }))} className="px-2 border rounded">-</button>
<span>{e.qty}</span>
<button onClick={() => dispatch(updateQuantity({ id: e.product.id, qty: e.qty + 1 }))} className="px-2 border rounded">+</button>
<button onClick={() => { if (confirm('Remove this item?')) dispatch(removeFromCart(e.product.id)); }} className="text-red-600 ml-2">Remove</button>
</div>
</div>
</div>
))}
</div>


<div className="mt-6 p-4 bg-white rounded shadow">
<p>Total items: {totalItems}</p>
<p className="font-bold text-lg">Total: ₹{totalPrice.toFixed(2)}</p>
<button onClick={() => { if (confirm('Clear the cart?')) dispatch(clearCart()); }} className="mt-3 bg-red-600 text-white px-4 py-2 rounded">Clear Cart</button>
</div>
</div>
);
}
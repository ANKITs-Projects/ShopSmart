import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import CartPage from './pages/CartPage';
import { useSelector } from 'react-redux';


export default function App() {
const items = useSelector((state) => state.cart.items);
const totalCount = Object.values(items).reduce((s, i) =>s+(i.qty || 0), 0)


return (
<div className="min-h-screen bg-gray-50">
<nav className="flex justify-between items-center bg-blue-600 text-white px-6 py-3">
<Link to="/" className="text-xl font-bold">ShopSmart</Link>
<Link to="/cart" className="hover:underline">Cart ({totalCount})</Link>
</nav>


<main className="max-w-6xl mx-auto p-4">
<Routes>
<Route path="/" element={<Home />} />
<Route path="/cart" element={<CartPage />} />
</Routes>
</main>
</div>
)
}
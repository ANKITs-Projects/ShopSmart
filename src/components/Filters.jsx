import React from 'react';


export default function Filters({ categories, values, onChange }) {

return (
<div className="flex flex-wrap gap-4 bg-white p-4 rounded shadow mb-6">
<input
value={values.search}
onChange={(e) => onChange({ ...values, search: e.target.value })}
placeholder="Search products..."
className="border p-2 rounded w-full sm:w-60"
/>

<select
value={values.category}
onChange={(e) => onChange({ ...values, category: e.target.value })}
className="border p-2 rounded"
>
<option value="">All Categories</option>
{categories.map((c) => (
<option key={c} value={c}>{c}</option>
))}
</select>
</div>
);
}
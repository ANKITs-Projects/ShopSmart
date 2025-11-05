import React, { useEffect, useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchProducts } from "../slices/productsSlice"
import ProductCard from "../components/ProductCard"
import Filters from "../components/Filters"
import useDebounce from "../hooks/useDebounce"

export default function Home() {
  const dispatch = useDispatch()
  const { items, status, categories } = useSelector((s) => s.products)

  useEffect(() => {
    if (status === "idle") dispatch(fetchProducts())
  }, [status, dispatch])

  const [filters, setFilters] = useState({
    search: "",
    category: "",
  });
  const debouncedSearch = useDebounce(filters.search, 500)
  const [page, setPage] = useState(1)
  const perPage = 6;

  const filtered = useMemo(() =>{
    let list = items.slice();
    if (filters.category)
      list = list.filter((p) => p.category === filters.category)
    if (debouncedSearch) {
      const q = debouncedSearch.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }
    return list;
  }, [items, filters.category, debouncedSearch])

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage))
  useEffect(() =>{
    if (page >totalPages) setPage(totalPages)
  }, [totalPages]);

  const pageItems = filtered.slice((page - 1) * perPage, page * perPage)
  if(status === "loading") return <h4 className="text-center">Loading....</h4>
  if(status === "failed") return <h4 className="text-center">Failed to fetch</h4>
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      {status === "loading"&&<p>Loading...</p>}
      {status === "failed"&& <p>Error loading products.</p>}

      <Filters
        categories={categories}
        values={filters}
        onChange={(v) => {
          setFilters(v)
          setPage(1)
        }}
      />

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {pageItems.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="bg-gray-200 px-3 py-1 rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span>
          Page {page}/{totalPages}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="bg-gray-200 px-3 py-1 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  )
}

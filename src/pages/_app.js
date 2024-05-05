import "@/styles/globals.css"
import Link from "next/link"
import { useState } from "react"

export default function App({ Component, pageProps }) {
  const [filter, setFilter] = useState("")

  return (
    <main className="flex flex-col">
      <header className="bg-slate-100 border-b border-slate-200 p-4">
        <div className="max-w-xl mx-auto flex justify-between items-center">
          <Link href="/">PLACES</Link>
          <input
            type="text"
            placeholder="Search applications..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="search-input"
          />
          <Link href="/search/results">SEARCH</Link>
          <Link href="/search/filters">Filter</Link>
          <Link href="/addApplication" className="ml-auto">ADD</Link>
        </div>
      </header>
      <section className="max-w-xl mx-auto p-4">
        <Component {...pageProps} filter={filter} />
      </section>
    </main>
  )
}

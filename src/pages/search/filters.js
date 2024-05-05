/* eslint-disable max-lines-per-function */
/* eslint-disable arrow-body-style */
import { useState, useEffect } from "react"
import axios from "axios"

export const getServerSideProps = async () => {
  const { data } = await axios("http://localhost:3000/api/application")

  return {
    props: { initialApplications: data },
  }
}
function ResultsPage({ initialApplications }) {
  const [applications] = useState(initialApplications)
  const [filters, setFilters] = useState({
    category: "",
    priceRange: { min: 0, max: 1000 },
    city: "",
  })
  useEffect(() => {
    // You might fetch the filtered data from an API on filters change
    // fetchApplications();
  }, [filters])
  const handleCategoryChange = (event) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      category: event.target.value,
    }))
  }
  const handleCityChange = (event) => {
    setFilters((prevFilters) => ({ ...prevFilters, city: event.target.value }))
  }
  const handleMinPriceChange = (event) => {
    const minPrice = event.target.value
    setFilters((prevFilters) => ({
      ...prevFilters,
      priceRange: { ...prevFilters.priceRange, min: minPrice },
    }))
  }
  const handleMaxPriceChange = (event) => {
    const maxPrice = event.target.value
    setFilters((prevFilters) => ({
      ...prevFilters,
      priceRange: { ...prevFilters.priceRange, max: maxPrice },
    }))
  }
  const filteredApplications = applications.filter((application) => {
    return (
      (!filters.category ||
        application.typeCategory
          .toLowerCase()
          .includes(filters.category.toLowerCase())) &&
      (!filters.city ||
        application.city.toLowerCase().includes(filters.city.toLowerCase())) &&
      application.price >= filters.priceRange.min &&
      application.price <= filters.priceRange.max
    )
  })

  return (
    <div>
      <select value={filters.category} onChange={handleCategoryChange}>
        <option value="">Select Category</option>
        <option value="restaurant">Restaurant</option>
        <option value="bar">Bar</option>
        <option value="store">Store</option>
      </select>

      <input
        type="text"
        value={filters.city}
        onChange={handleCityChange}
        applicationholder="Filter by city"
      />

      <input
        type="number"
        applicationholder="Min Price"
        value={filters.priceRange.min}
        onChange={handleMinPriceChange}
      />
      <input
        type="number"
        applicationholder="Max Price"
        value={filters.priceRange.max}
        onChange={handleMaxPriceChange}
      />

      <ul>
        {filteredApplications.map((application) => (
          <li key={application._id}>
            <div>
              {application.typeCategory} - {application.name}
            </div>
            <div>
              {application.address}, {application.city} {application.zipCode}, {application.country}
            </div>
            <div>${application.price}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ResultsPage

import Link from "next/link"
import axios from "axios"
import { useState } from "react"
import { Button } from "@/components/Button"

export const getServerSideProps = async () => {
  const { data } = await axios("http://localhost:3000/api/application")

  return {
    props: { initialLieux: data },
  }
}
const HomePage = ({ initialLieux }) => {
  const [lieux, setLieux] = useState(initialLieux)
  const handleDelete = (applicationId) => async () => {
    const deletedApplication = lieux.find(({ _id }) => _id === applicationId)
    const newLieux = lieux.filter(({ _id }) => _id !== applicationId)
    setLieux(newLieux)

    try {
      await axios.delete(`http://localhost:3000/api/application/${applicationId}`)
    } catch (err) {
      setLieux([...newLieux, deletedApplication])
    }
  }

  return (
    <ul className="flex flex-col gap-4">
      {lieux.map(
        ({
          _id,
          typeCategory,
          name,
          address,
          city,
          zipCode,
          country,
          price,
        }) => (
          <li
            key={_id}
            className="border rounded-lg p-4 shadow hover:shadow-lg transition-shadow"
          >
            <Link
              href={`/lieux/${_id}/edit`}
              className="flex items-center justify-between"
            >
              <div>
                <p className="text-lg font-bold">{name}</p>
                <p>Category : {typeCategory}</p>
                <p>Address : {address}</p>
                <p>City : {city}</p>
                <p>Zip Code : {zipCode}</p>
                <p>Country : {country}</p>
                <p>Price : {price}</p>
              </div>
            </Link>
            <Button
              onClick={handleDelete(_id)}
              variant="danger"
              size="md"
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              DELETE
            </Button>
          </li>
        ),
      )}
    </ul>
  )
}

export default HomePage

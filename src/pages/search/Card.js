const Card = ({ application }) => (
      <div className="bg-white shadow-md rounded-lg p-4">
        <h2 className="text-xl font-semibold">{application.name}</h2>
        <p className="text-gray-600">{application.typeCategory}</p>
        <p className="text-gray-600">{application.address}</p>
        <p className="text-gray-600">{application.city}, {application.zipCode}, {application.country}</p>
        <p className="text-gray-600">${application.price}</p>
      </div>
    )
 
  export default Card
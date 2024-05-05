import { createRoute } from "@/api/createRoute"
import { ApplicationModel } from "@/database/models/Application"
 
const handler = createRoute(async (req, res) => {
  const { applicationId } = req.query
 
  try {
    const application = await ApplicationModel.findById(applicationId)
 
    if (!application) {
      return res.status(404).send({ error: "not found" })
    }
 
    if (req.method === "GET") {
      return res.send(application)
    }
 
    if (req.method === "PATCH") {
      const { typeCategory, name, address, city, zipCode, country, price, cuisineType, starRating, artMovement, artType, isPaid, barType, parkType, parkAccessType } = req.body
      const updatedFields = {
        typeCategory: typeCategory || application.typeCategory,
        name: name || application.name,
        address: address || application.address,
        city: city || application.city,
        zipCode: zipCode || application.zipCode,
        country: country || application.country,
        price: price || application.price,
        cuisineType: cuisineType || application.cuisineType,
        starRating: starRating || application.starRating,
        artMovement: artMovement || application.artMovement,
        artType: artType || application.artType,
        isPaid: isPaid || application.isPaid,
        barType: barType || application.barType,
        parkType: parkType || application.parkType,
        parkAccessType: parkAccessType || application.parkAccessType,
      }
 
      Object.assign(application, updatedFields)
 
      await application.save()
 
      return res.send(application)
    }
 
    if (req.method === "DELETE") {
      await application.deleteOne()
 
      return res.status(204).end()
    }
  } catch (error) {
    /*Console.error("Error processing request:", error)*/

    
return res.status(500).send({ error: "Internal server error" })
  }
})
 
export default handler
 
import { listCategory } from "@/utils/constant"
import { Schema } from "mongoose"

export const applicationSchema = new Schema({
  typeCategory: { type: String, required: true, enum: listCategory },
  name: { type: String },
  address: { type: String },
  city: { type: String },
  zipCode: { type: String },
  country: { type: String },
  price: { type: String },
})

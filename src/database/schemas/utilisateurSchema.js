import { Schema } from "mongoose"

export const applicationSchema = new Schema({
  id: { type: String },
  password: { type: String },
})

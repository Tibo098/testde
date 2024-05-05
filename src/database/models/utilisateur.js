// User.js
import { applicationSchema } from "@/database/schemas/applicationSchema"
import mongoose from "mongoose"

export const UtilisateurModel =
  mongoose.models.Utilisateur || mongoose.model("Utilisateur", applicationSchema)

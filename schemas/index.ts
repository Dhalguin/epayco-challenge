import mongoose from 'mongoose'

type Client = {
  _id: string
  documento: number
  nombres: string
  email: string
  celular: string
  valor: number
}

const ClientSchema = new mongoose.Schema<Client>({
  documento: { type: Number, required: true },
  nombres: { type: String, required: true },
  email: { type: String, required: true },
  celular: { type: String, required: true },
  valor: { type: Number, required: true, default: 0 },
})

export const ClientModel = mongoose.model('Client', ClientSchema)

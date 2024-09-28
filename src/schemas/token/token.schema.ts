import mongoose, { ObjectId } from 'mongoose'

type Token = {
  _clientId: ObjectId
  token: number
  sessionId: string
  expiredAt: Date
}

const TokenSchema = new mongoose.Schema<Token>(
  {
    _clientId: { type: mongoose.Types.ObjectId, required: true, ref: 'Client' },
    token: { type: Number, required: true },
    sessionId: { type: String, required: true },
    expiredAt: { type: Date, expires: '2m', default: Date.now },
  },
  {
    expireAfterSeconds: 600,
  }
)

export const TokenModel = mongoose.model('Token', TokenSchema)

import { Request, Response } from 'express'
import { RegistrarClienteDTO } from '../schemas/client.dto'
import { ClientModel } from '../schemas'

export const registroCliente = async (req: Request<{}, {}, RegistrarClienteDTO>, res: Response) => {
  try {
    const { documento, email, celular } = req.body

    const exists = await ClientModel.findOne({ $or: [{ documento }, { email }, { celular }] })
    if (exists) res.status(400).json({ success: 'FAILED', message: 'El cliente ya se encuentra registrado' })

    const clientCreated = await ClientModel.create(req.body)
    await clientCreated.save()

    res.status(201).json({ success: 'OK', data: clientCreated, message: 'Cliente registrado correctamente' })
  } catch (err) {
    res.status(500).json({ sucess: 'FAILED', message: 'Error del servidor' })
  }
}

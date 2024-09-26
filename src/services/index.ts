import { Request, Response } from 'express'
import { RecargaBilleteraDTO, RegistrarClienteDTO } from '../schemas/client.dto'
import { ClientModel } from '../schemas'

export const registroCliente = async (req: Request<{}, {}, RegistrarClienteDTO>, res: Response) => {
  try {
    const { documento, email, celular } = req.body

    const exists = await ClientModel.findOne({ $or: [{ documento }, { email }, { celular }] })
    if (exists)
      return res.status(400).json({
        success: 'FAILED',
        message: 'El cliente ya se encuentra registrado',
      })

    const clientCreated = await ClientModel.create(req.body)
    await clientCreated.save()

    return res.status(201).json({
      success: 'OK',
      data: clientCreated,
      message: 'Cliente registrado correctamente',
    })
  } catch (err) {
    return res.status(500).json({
      sucess: 'FAILED',
      message: 'Error del servidor',
    })
  }
}

export const recargaBilletera = async (req: Request<{}, {}, RecargaBilleteraDTO>, res: Response) => {
  try {
    const { documento, celular, valor } = req.body

    if (valor <= 0)
      return res.status(400).json({
        success: 'FAILED',
        message: 'Ingrese un monto válido',
      })

    const client = await ClientModel.findOne({ $and: [{ documento }, { celular }] })
    if (!client)
      return res.status(401).json({
        success: 'FAILED',
        message: 'No se pudo recargar la billetera',
      })

    await client.updateOne({ valor: client.valor + valor })

    return res.status(200).json({
      success: 'OK',
      message: 'Ha recargado su billetera correctamente',
    })
  } catch (err) {
    return res.status(500).json({
      sucess: 'FAILED',
      message: 'Error del servidor',
    })
  }
}

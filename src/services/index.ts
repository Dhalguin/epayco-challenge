import { Request, Response } from 'express'
import { ConfirmPaymentDTO, GenerateTokenDTO, RecargaBilleteraDTO, RegistrarClienteDTO } from '../schemas/client.dto'
import { ClientModel } from '../schemas'
import { generateToken, roundNumber } from '../utils/number'
import crypto from 'crypto'
// import { sendMail } from '../config/nodemailer'
import { TokenModel } from '../schemas/token/token.schema'

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

export const pagar = async (req: Request<{}, {}, GenerateTokenDTO>, res: Response) => {
  try {
    const { documento, celular } = req.body

    const client = await ClientModel.findOne({ $and: [{ documento }, { celular }] })
    if (!client)
      return res.status(401).json({
        success: 'FAILED',
        message: 'No se pudo realizar el pago',
      })

    const token = Number(generateToken(6))
    const sessionId = crypto.randomBytes(8).toString('hex')

    await TokenModel.create({
      _clientId: client._id,
      token,
      sessionId,
    })
    // sendMail()

    return res.status(200).json({
      success: 'OK',
      data: { sessionId, token },
      message: 'Le hemos enviado un código de confirmación a su correo! Introduzcalo a continuación',
    })
  } catch (err) {
    return res.status(500).json({
      sucess: 'FAILED',
      message: 'Error del servidor',
    })
  }
}

export const confirmarPago = async (req: Request<{}, {}, ConfirmPaymentDTO>, res: Response) => {
  try {
    const { token, sessionId, clientId, monto } = req.body

    const searchToken = await TokenModel.findOne({ _clientId: clientId })
    if (!searchToken || searchToken.sessionId !== sessionId)
      return res.status(401).json({
        success: 'FAILED',
        message: 'El código de verificación ya expiró',
      })

    if (searchToken.token !== token)
      return res.status(401).json({
        success: 'FAILED',
        message: 'El código de verificación es incorrecto',
      })

    const client = await ClientModel.findOne({ _id: clientId })
    if (!client)
      return res.status(401).json({
        success: 'FAILED',
        message: 'No se pudo confirmar el pago',
      })

    if (client.valor < monto)
      return res.status(401).json({
        success: 'FAILED',
        message: 'Saldo insuficiente',
      })

    await client.updateOne({ valor: client.valor - monto })

    return res.status(200).json({
      success: 'OK',
      message: 'Pago realizado correctamente',
    })
  } catch (err) {
    return res.status(500).json({
      sucess: 'FAILED',
      message: 'Error del servidor',
    })
  }
}

export const consultaSaldo = async (
  req: Request<{ documento: string }, {}, {}, { celular: string }>,
  res: Response
) => {
  try {
    const { documento } = req.params
    const { celular } = req.query

    const client = await ClientModel.findOne({ $and: [{ documento }, { celular }] })
    if (!client)
      return res.status(401).json({
        success: 'FAILED',
        message: 'Las crendenciales no coinciden! Intente de nuevo',
      })

    return res.status(200).json({
      success: 'OK',
      data: client,
      message: 'Ingreso correcto',
    })
  } catch (err) {
    return res.status(500).json({
      sucess: 'FAILED',
      message: 'Error del servidor',
    })
  }
}

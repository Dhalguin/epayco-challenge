export type RegistrarClienteDTO = {
  documento: number
  nombres: string
  email: string
  celular: string
}

export type RecargaBilleteraDTO = {
  documento: number
  celular: string
  valor: number
}

export type GenerateTokenDTO = {
  documento: number
  celular: string
}

export type ConfirmPaymentDTO = {
  clientId: string
  token: number
  sessionId: string
  monto: number
}

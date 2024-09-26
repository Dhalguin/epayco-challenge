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

export type PagarCompraDTO = {
  documento: number
  celular: string
  monto: number
}

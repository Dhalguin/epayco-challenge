import { Request, Router } from 'express'
import { consultaSaldo, pagarCompra, recargaBilletera, registroCliente } from '../services'

const router = Router()

router.post('/', (req, res) => registroCliente(req, res))

router.put('/recharge', (req, res) => recargaBilletera(req, res))

router.put('/pay', (req, res) => pagarCompra(req, res))

router.get('/:documento', (req: Request<{ documento: string }, {}, {}, { celular: string }>, res) =>
  consultaSaldo(req, res)
)

export default router

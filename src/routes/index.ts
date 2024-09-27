import { Request, Router } from 'express'
import { confirmarPago, consultaSaldo, pagar, recargaBilletera, registroCliente } from '../services'

const router = Router()

router.post('/', (req, res) => registroCliente(req, res))

router.put('/recharge', (req, res) => recargaBilletera(req, res))

router.post('/payment/generate', (req, res) => pagar(req, res))

router.put('/payment/confirm', (req, res) => confirmarPago(req, res))

router.get('/:documento', (req: Request<{ documento: string }, {}, {}, { celular: string }>, res) =>
  consultaSaldo(req, res)
)

export default router

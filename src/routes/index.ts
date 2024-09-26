import { Request, Router } from 'express'
import { consultaSaldo, recargaBilletera, registroCliente } from '../services'

const router = Router()

router.post('/', (req, res) => registroCliente(req, res))

router.put('/', (req, res) => recargaBilletera(req, res))

router.get('/:documento', (req: Request<{ documento: string }, {}, {}, { celular: string }>, res) =>
  consultaSaldo(req, res)
)

export default router

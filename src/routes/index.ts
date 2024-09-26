import { Router } from 'express'
import { recargaBilletera, registroCliente } from '../services'

const router = Router()

router.post('/', (req, res) => registroCliente(req, res))

router.put('/', (req, res) => recargaBilletera(req, res))

export default router

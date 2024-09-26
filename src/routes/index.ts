import { Router } from 'express'
import { registroCliente } from '../services'

const router = Router()

router.post('/', (req, res) => registroCliente(req, res))

export default router

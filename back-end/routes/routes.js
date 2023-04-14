import express from 'express'
import { createUsuario, updateUsuario, deleteUsuario, searchUsuario} from '../controllers/userController.js'
const router= express.Router()

router.post('/',createUsuario)
router.get('/:id',searchUsuario)
router.put('/:id',updateUsuario)
router.delete('/:id',deleteUsuario)
export default router; 
import express from 'express'
import { iniciarSesion, createUsuario, updateUsuario, deleteUsuario, searchUsuario} from '../controllers/userController.js'
const router= express.Router()

router.post('/register',createUsuario)
router.post('/signin',iniciarSesion)
router.get('/:id',searchUsuario)
router.put('/:id',updateUsuario)
router.delete('/:id',deleteUsuario)
export default router; 
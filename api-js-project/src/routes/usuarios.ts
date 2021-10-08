import { Router } from "express";
import { UsuariosController } from "../controller/UsuariosController";

const router = Router();

//Obtiene todo
router.get('/', UsuariosController.getAll);

//Obtiene el id
router.get('/:id', UsuariosController.getById);

//crear
router.post('/', UsuariosController.new);

//modifica
router.patch('/:id', UsuariosController.modify);

//elimina
router.delete('/:id', UsuariosController.delete);


export default router;  
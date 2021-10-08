import { Router } from "express";
import { ClienteController } from "../controller/ClienteController";

const router = Router();

//Obtiene todo
router.get('/', ClienteController.getAll);

//Obtiene el id
router.get('/:id', ClienteController.getById);

//crear
router.post('/', ClienteController.new);

//modifica
router.patch('/:id', ClienteController.modify);

//elimina
router.delete('/:id', ClienteController.delete);


export default router;
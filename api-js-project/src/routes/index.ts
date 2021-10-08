import { Router } from "express";
import clientes from "./clientes";
import usuarios from "./usuarios";

const router = Router();

router.use('/usuario', usuarios);
router.use('/cliente', clientes)



export default router;

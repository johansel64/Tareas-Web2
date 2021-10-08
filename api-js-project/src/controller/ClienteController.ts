import { validate } from "class-validator";
import { Request, Response } from "express";
import { getRepository, MaxKey } from "typeorm";
import { Clientes } from "../entity/Clientes";
import { Personas } from "../entity/Personas";

export class ClienteController{

    static getAll = async (req: Request, res: Response)=>{
        const clientesReq = getRepository(Clientes);
        let lista;
        try {
            lista = await clientesReq.createQueryBuilder("cli")
            .innerJoinAndSelect("cli.persona", "persona")
            .where({estado: true})
            .getMany();
            
        } catch (error) {
            res.status(404).json({message: 'Algo salio mal'});
        }
        
        if (lista.length > 0){
            res.send(lista);
        }else{
            res.status(404).json({message: 'No hay resultados'});
        }
    
    }

    static getById = async (req: Request, res: Response)=>{
        const clientesReq = getRepository(Clientes);
     
        const {id} = req.params
        try {
            const cliente = await clientesReq.createQueryBuilder("cli")
            .innerJoinAndSelect("cli.persona", "persona")
            .where("idCliente = :id AND estado = true", {id}).getOneOrFail();
            res.send(cliente);

        } catch (error) {
            res.status(404).json({message: 'No se encontro el usuario'});
        }
        

    }

    static new = async (req:Request, res:Response)=>{
        const clienteRepo = getRepository(Clientes);
        const { correo, tipoCliente, aplicaDesc, descuentoMax, persona} = req.body;

        let cliente = new Clientes();

        if(!correo){res.status(404).json({mensaje:'Falta correo electrónico!'})}
        if(!tipoCliente){res.status(404).json({mensaje:'Falta tipo de cliente!'})}
        if(!aplicaDesc){res.status(404).json({mensaje:'Falta aplica descuento!'})}
        if(!descuentoMax){res.status(404).json({mensaje:'Falta descuento max!'})}
        if(!persona.nombre){res.status(404).json({mensaje:'Falta nombre!'})}
        if(!persona.apellido1){res.status(404).json({mensaje:'Falta apellido 1!'})}
        if(!persona.apellido2){res.status(404).json({mensaje:'Falta apellido 2!'})}
        if(!persona.fechaNacimiento){res.status(404).json({mensaje:'Falta fecha de nacimiento!'})}   
        

        cliente.correo = correo;
        cliente.tipoCliente = tipoCliente;
        cliente.aplicaDesc = aplicaDesc;
        cliente.descuentoMax = descuentoMax;
        cliente.estado = true;
        cliente.persona = persona;

        const validateOpt = {validationError: {target:false, value:false}};
        const errores = await validate(cliente, validateOpt);
        if(errores.length > 0){
            return res.status(400).json(errores)
        }
        
        try {
            await clienteRepo.save(cliente);
        } catch (error) {
            return res.status(409).json({mensaje:'El usuario ya existe!'})
        }

        res.status(201).send("Cliente creado!")
    }


    static modify = async (req:Request, res:Response)=>{
        const clientesReq = getRepository(Clientes);
        const personaRepo = getRepository(Personas);
        const {id} = req.params;
        const { correo, tipoCliente, aplicaDesc, descuentoMax, persona} = req.body;

        let cliente;
        let personaCli;

        try {
            cliente = await clientesReq.createQueryBuilder("cli")
            .innerJoinAndSelect("cli.persona", "persona")
            .where("idCliente = :id AND estado = true", {id}).getOneOrFail();
            personaCli = await personaRepo.findOneOrFail(cliente.persona.id)


        } catch (error) {
            return res.status(404).json({message: 'El usuario no existe'});
        }

        if(!correo){res.status(404).json({mensaje:'Falta correo electrónico!'})}
        if(!tipoCliente){res.status(404).json({mensaje:'Falta tipo de cliente!'})}
        if(!aplicaDesc){res.status(404).json({mensaje:'Falta aplica descuento!'})}
        if(!descuentoMax){res.status(404).json({mensaje:'Falta descuento max!'})}
        if(!persona.nombre){res.status(404).json({mensaje:'Falta nombre!'})}
        if(!persona.apellido1){res.status(404).json({mensaje:'Falta apellido 1!'})}
        if(!persona.apellido2){res.status(404).json({mensaje:'Falta apellido 2!'})}
        if(!persona.fechaNacimiento){res.status(404).json({mensaje:'Falta fecha de nacimiento!'})}   
        

        personaCli.nombre = persona.nombre;
        personaCli.apellido1 = persona.apellido1;
        personaCli.apellido2 = persona.apellido2;
        personaCli.fechaNacimiento = persona.fechaNacimiento;
        
        
        cliente.correo = correo;
        cliente.tipoCliente = tipoCliente;
        cliente.aplicaDesc = aplicaDesc;
        cliente.descuentoMax = descuentoMax;
        cliente.persona = personaCli;
        cliente.estado = true;

        console.log(cliente);

        const validateOpt = {validationError: {target:false, value:false}};
        const errores = await validate(cliente, validateOpt);
        if(errores.length > 0){
            return res.status(400).json(errores)
        }
        
        try {
            await clientesReq.save(cliente);
        } catch (error) {
            console.log(error.message)
            return res.status(409).json({mensaje:'El cliente ya esta actualizado!'})
        }

        res.status(201).send("Cliente actualizado!")
    }

    static delete = async (req:Request, res:Response)=>{
        const clientesReq = getRepository(Clientes);
        const {id} = req.params;
        let cliente;

        try {
            cliente = await clientesReq.findOneOrFail(id, {select: ['idCliente'], where: {estado:true}});
            console.log(cliente)
        } catch (error) {
            res.status(409).json({message:'Error al eliminar este cliente o ya fue eliminado antes!'})
        }

        cliente.estado = false;

        try {
            await clientesReq.save(cliente);
        } catch (error) {
            return res.status(409).json({mensaje:'El correo ya existe!'})
        }

        res.status(201).send("Usuario eliminado!")

      

    }
    

}
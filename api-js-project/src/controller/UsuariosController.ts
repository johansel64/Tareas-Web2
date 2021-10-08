import { json } from "body-parser";
import { validate } from "class-validator";
import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Usuarios } from "../entity/Usuarios";

export class UsuariosController{

    static getAll = async (req: Request, res: Response)=>{
        const usuarios = getRepository(Usuarios);
        let lista;
        try {
            lista = await usuarios.find({select: ['id', 'nombre', 'apellido1', 'apellido2'], where: {estado:1}});
            
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
        const usuarioReq = getRepository(Usuarios);
     
        const {id} = req.params
        try {
            const usuario = await usuarioReq.findOneOrFail(id, {select: ['id', 'nombre', 'apellido1', 'apellido2'], where: {estado:1}});
            res.send(usuario);
        } catch (error) {
            res.status(404).json({message: 'No se encontro el usuario'});
        }
        

    }

    static new = async (req: Request, res: Response)=>{
        const usuarioReq = getRepository(Usuarios);

        const {nombre, apellido1, apellido2, correo, fechaNacimiento, password} = req.body;

        let usuario = new Usuarios();

        if(!nombre){res.status(404).json({message: 'Falta el nombre'});}
        if(!apellido1){res.status(404).json({message: 'Falta el apellido1'});}
        if(!apellido2){res.status(404).json({message: 'Falta el apellido2'})}
        if(!correo){res.status(404).json({message: 'Falta el correo'})}
        if(!fechaNacimiento){res.status(404).json({message: 'Falta el fechaNacimiento'})}
        if(!password){res.status(404).json({message: 'Falta el pasword'})}

        usuario.nombre = nombre;
        usuario.apellido1 = apellido1;
        usuario.apellido2 = apellido2;
        usuario.correo = correo;
        usuario.fechaNacimiento = fechaNacimiento;
        usuario.password = password;
        usuario.estado = true;

        const validateOpt = {validationError: {target: false, value: false}};
        const errores = await validate(usuario, validateOpt);
        if(errores.length > 0){
            return res.status(400).json(errores);
        }

        usuario.hasPassword();

        try {
            await usuarioReq.save(usuario);
           
        } catch (error) {
            return res.status(409).json({message: 'El usuario ya existe'});
        }
        res.status(200).send('usuario creado');

        
    }

    static modify = async (req: Request, res: Response)=>{
        const usuarioReq = getRepository(Usuarios);
        const {id} = req.params;
        const {nombre, apellido1, apellido2, correo, fechaNacimiento, password} = req.body;
        let usuario;

        try {
            usuario = await usuarioReq.findOneOrFail(id);
           
        } catch (error) {
            return res.status(404).json({message: 'El usuario no existe'});
        }
        if(!nombre){res.status(404).json({message: 'Falta el nombre'});}
        if(!apellido1){res.status(404).json({message: 'Falta el apellido1'});}
        if(!apellido2){res.status(404).json({message: 'Falta el apellido2'})}
        if(!correo){res.status(404).json({message: 'Falta el correo'})}
        if(!fechaNacimiento){res.status(404).json({message: 'Falta el fechaNacimiento'})}
        if(!password){res.status(404).json({message: 'Falta el pasword'})}

        usuario.nombre = nombre;
        usuario.apellido1 = apellido1;
        usuario.apellido2 = apellido2;
        usuario.correo = correo;
        usuario.fechaNacimiento = fechaNacimiento;
        usuario.password = password;
        
        const validateOpt = {validationError: {target: false, value: false}};
        const errores = await validate(usuario, validateOpt);
        if(errores.length > 0){
            return res.status(400).json(errores);
        }

        usuario.hasPassword();
        
        try {
            await usuarioReq.save(usuario);
            
        } catch (error) {
            return res.status(409).json({message: 'El correo ya existe'});
        }

        res.status(200).send('Usuario modificado');
        
    }

    static delete = async (req: Request, res: Response)=>{
        const usuarioReq = getRepository(Usuarios);
        const {id} = req.params;
        let usuario;

        try {
            usuario = await usuarioReq.findOneOrFail(id);
           
        } catch (error) {
            res.status(404).json({message: 'El usuario no existe'});
        }

        usuario.estado = false;

        try {
            await usuarioReq.save(usuario);
            
        } catch (error) {
            return res.status(409).json({message: 'Error al eliminar'});
        }
        res.status(200).send('Usuario eliminado');

    }

}
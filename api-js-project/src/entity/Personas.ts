import { IsNotEmpty } from "class-validator";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Clientes } from "./Clientes";

@Entity()


export class Personas {

    @PrimaryGeneratedColumn()
    idPersona: number;

    @Column()
    @IsNotEmpty()
    nombre: string;

    @Column()
    @IsNotEmpty()
    apellido1: string;

    @Column()
    @IsNotEmpty()
    apellido2: string;

    @Column()
    //@IsDate()
    @IsNotEmpty()

    fechaNacimiento: Date;

    @OneToOne(() => Clientes, cliente => cliente.persona )
    cliente: Clientes;
}
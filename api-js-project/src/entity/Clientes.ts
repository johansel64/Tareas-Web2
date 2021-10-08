import { IsEmail, IsNotEmpty } from "class-validator";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Personas } from "./Personas";

@Entity()
@Unique(['correo'])
export class Clientes {

    @PrimaryGeneratedColumn()
    idCliente: number;

    @Column()
    @IsNotEmpty()
    @IsEmail()
    correo: string;

    @Column()
    @IsNotEmpty()
    tipoCliente: string;

    @Column()
    @IsNotEmpty()
    aplicaDesc: boolean;

    @Column()
    @IsNotEmpty()
    descuentoMax: number;

    @Column()
    estado: boolean;

    @OneToOne(() => Personas, persona => persona.cliente, {
        cascade: true,
    })
    @JoinColumn({name: "idPersonaFk"})
    persona: Personas;

}
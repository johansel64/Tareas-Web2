import { IsDate, IsEmail, IsNotEmpty } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";
import * as bcrypt from 'bcryptjs';

@Entity()
@Unique(['correo'])

export class Usuarios {

    @PrimaryGeneratedColumn()
    id: number;

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

    @Column()
    @IsNotEmpty()
    @IsEmail()
    correo: string;

    @Column()
    @IsNotEmpty()
    password: string;

    @Column()
    estado: boolean;

    hasPassword():void {
        const salt = bcrypt.genSaltSync(10);
        this.password = bcrypt.hashSync(this.password, salt);
    }
}
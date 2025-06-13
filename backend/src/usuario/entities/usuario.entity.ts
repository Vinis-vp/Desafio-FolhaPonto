import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('usuario')
export class Usuario {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type:'int'})
    tipoUsuario: number;

    @Column({ type:'varchar', length: 100, nullable: false})
    nome: string;

    @Column({ type:'varchar', length: 20, nullable: false})
    matricula: string;

    @Column({ type:'varchar', length: 255, nullable: false})
    senha: string;

    @Column({ type:'varchar', length: 255, nullable: false})
    salt: string;

    @Column({ type:'datetime' })
    dataCriacao: string
}

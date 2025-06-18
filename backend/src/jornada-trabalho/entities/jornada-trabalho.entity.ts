import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('jornadaTrabalho')
export class JornadaTrabalho {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type:'time' })
    entradaManha: string

    @Column({ type:'time' })
    saidaManha: string

    @Column({ type:'time' })
    entradaTarde: string

    @Column({ type:'time' })
    saidaTarde: string

    @Column({ type: 'int', nullable: false })
    idUsuario: number;
}
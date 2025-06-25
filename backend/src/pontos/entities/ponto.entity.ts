import { Column, Entity, PrimaryColumn } from "typeorm";

export enum TipoRegistro {
    ENTRADA_MANHA = 'entrada_manha',
    SAIDA_MANHA = 'saida_manha',
    ENTRADA_TARDE = 'entrada_tarde',
    SAIDA_TARDE = 'saida_tarde',
}

@Entity('pontos')
export class Pontos {
    @PrimaryColumn()
    id: number;

    @Column({ type: 'int', nullable: false})
    idUsuario: number;

    @Column({ type:'time' })
    horarioReal: string;

    @Column({ type:'date' })
    dataRegistro: string;

    @Column({ type:'tinyint' })
    dentroDaJanela: boolean;

    @Column({ type:'enum', enum: TipoRegistro })
    tipoRegistro: TipoRegistro
}
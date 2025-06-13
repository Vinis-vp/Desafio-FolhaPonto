import { Type } from "class-transformer";
import { IsNumber, IsString } from "class-validator";

export class CreateUsuarioDto {

    @IsNumber()
    @Type(() => Number)
    id: number;

    @IsNumber()
    @Type(() => Number)
    tipoUsuario: number;

    @IsString()
    nome: string;

    @IsString()
    matricula: string;

    @IsString()
    senha: string;

}

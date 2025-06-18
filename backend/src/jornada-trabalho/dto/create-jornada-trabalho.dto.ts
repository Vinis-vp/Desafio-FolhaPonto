import { Type } from "class-transformer";
import { IsInt, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateJornadaTrabalhoDto {

    @IsNumber()
    @Type(() => Number)
    id: number;

    @IsString()
    entradaManha: string;

    @IsString()
    saidaManha: string;

    @IsString()
    entradaTarde: string;

    @IsString()
    saidaTarde: string;

    @IsNotEmpty()
    @IsInt()
    idUsuario: number;
}
import { Type } from "class-transformer";
import { IsNumber, IsString } from "class-validator";

export class CreatePontoDto {

    @IsNumber()
    @Type(() => Number)
    idUsuario: number;

    @IsString()
    horarioReal: string;

    @IsString()
    dataRegistro: string;
}

import { Type } from "class-transformer";
import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";

export class CreateUsuarioDto {

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

    @IsOptional()
    @IsNotEmpty()
    @IsInt()
    idUsuario: number;
}

export class FuncionarioDto {
  @ValidateNested()
  @Type(() => CreateUsuarioDto)
  usuario: CreateUsuarioDto;

  @ValidateNested()
  @Type(() => CreateJornadaTrabalhoDto)
  jornada: CreateJornadaTrabalhoDto;
}
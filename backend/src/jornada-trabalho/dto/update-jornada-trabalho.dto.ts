import { PartialType } from '@nestjs/mapped-types';
import { CreateJornadaTrabalhoDto } from './create-jornada-trabalho.dto';

export class UpdateJornadaTrabalhoDto extends PartialType(CreateJornadaTrabalhoDto) {}

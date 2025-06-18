import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateJornadaTrabalhoDto } from './dto/create-jornada-trabalho.dto';
import { UpdateJornadaTrabalhoDto } from './dto/update-jornada-trabalho.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { JornadaTrabalho } from './entities/jornada-trabalho.entity';
import { Repository } from 'typeorm';

@Injectable()
export class JornadaTrabalhoService {
  constructor (
    @InjectRepository(JornadaTrabalho)
    private jornadaTrabalhoRepository: Repository<JornadaTrabalho>
  ) {}

  async create(createJornadaTrabalhoDto: CreateJornadaTrabalhoDto): Promise<JornadaTrabalho> {
    const jornada = await this.jornadaTrabalhoRepository.create(createJornadaTrabalhoDto);
    await this.jornadaTrabalhoRepository.save(jornada);
    return jornada;
  }

  findAll() {
    return `This action returns all jornadaTrabalho`;
  }

  async findOne(idUsuario: number): Promise<JornadaTrabalho> {
    const jornada = await this.jornadaTrabalhoRepository.findOneBy({ idUsuario })
    if (!jornada){
      throw new HttpException('Jornada de trabalho não encontrada!', HttpStatus.NOT_FOUND)
    }
    return jornada;
  }

  update(id: number, updateJornadaTrabalhoDto: UpdateJornadaTrabalhoDto) {
    return `This action updates a #${id} jornadaTrabalho`;
  }

  remove(id: number) {
    return `This action removes a #${id} jornadaTrabalho`;
  }
}

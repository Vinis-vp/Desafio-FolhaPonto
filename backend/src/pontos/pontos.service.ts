import { Injectable } from '@nestjs/common';
import { CreatePontoDto } from './dto/create-ponto.dto';
import { UpdatePontoDto } from './dto/update-ponto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Ponto } from './entities/ponto.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PontosService {
  constructor(
    @InjectRepository(Ponto)
    private pontoRepository: Repository<Ponto>
  ){}

  async create(createPontoDto: CreatePontoDto): Promise<Ponto> {
    const ponto = await this.pontoRepository.create(createPontoDto)
    
    return await this.pontoRepository.save(ponto); 
  }

  findAll() {
    return `This action returns all pontos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ponto`;
  }

  update(id: number, updatePontoDto: UpdatePontoDto) {
    return `This action updates a #${id} ponto`;
  }

  remove(id: number) {
    return `This action removes a #${id} ponto`;
  }
}

import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePontoDto } from './dto/create-ponto.dto';
import { UpdatePontoDto } from './dto/update-ponto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Pontos, TipoRegistro } from './entities/ponto.entity';
import { Repository } from 'typeorm';
import { JornadaTrabalhoService } from 'src/jornada-trabalho/jornada-trabalho.service';

@Injectable()
export class PontosService {
  constructor(
    @InjectRepository(Pontos)
    private pontoRepository: Repository<Pontos>,
    private readonly jornadaTrabalhoService: JornadaTrabalhoService 
  ){}

  async create(user: any, createPontoDto: CreatePontoDto): Promise<Pontos> {
    
    const [h, m] = createPontoDto.horarioReal.split(':').map(Number);
    const [ano, mes, dia] = createPontoDto.dataRegistro.split('-').map(Number);

    const agora = new Date(ano, mes - 1, dia, h, m); // mes - 1 porque janeiro = 0

    const jornada = await this.jornadaTrabalhoService.findOne(user.id);
    if (!jornada) throw new BadRequestException('Jornada de trabalho não encontrada');

    const janelas = [
      { nome: TipoRegistro.ENTRADA_MANHA, valor: jornada.entradaManha },
      { nome: TipoRegistro.SAIDA_MANHA, valor: jornada.saidaManha },
      { nome: TipoRegistro.ENTRADA_TARDE, valor: jornada.entradaTarde },
      { nome: TipoRegistro.SAIDA_TARDE, valor: jornada.saidaTarde },
    ];
    
    const janelaUtilizada = janelas.find(({ valor }) => {
      const horarioAlvo = this.combinarHorarioData(agora, valor);
      const inicio = new Date(horarioAlvo.getTime() - 15 * 60000);
      const fim = new Date(horarioAlvo.getTime() + 15 * 60000);
      return agora >= inicio && agora <= fim;
    });
    
    if (!janelaUtilizada) {
      throw new BadRequestException('Falar com o RH');
    }

    const pontoExistente = await this.findByUsuarioTipoEData(user.id, janelaUtilizada.nome, createPontoDto.dataRegistro);

    if (pontoExistente) {
      throw new BadRequestException(`Você já registrou ${janelaUtilizada.nome.replace('_', ' ')} hoje.`);
    }
    console.log(pontoExistente)

    const ponto = await this.pontoRepository.create(createPontoDto);
    ponto.idUsuario = user.id
    ponto.tipoRegistro = janelaUtilizada.nome
    ponto.dentroDaJanela = true
    return await this.pontoRepository.save(ponto);
  }

  private combinarHorarioData(baseDate: Date, horario: string): Date {
    const [horas, minutos] = horario.split(':').map(Number);
    const novaData = new Date(baseDate);
    novaData.setHours(horas, minutos, 0, 0);
    return novaData;
  }

  findAll() {
    return `This action returns all pontos`;
  }

  async findByUsuarioTipoEData(idUsuario: number, tipoRegistro: TipoRegistro, dataRegistro: string): Promise<Pontos | null> {
    return await this.pontoRepository.findOne({
      where: {
        idUsuario,
        tipoRegistro,
        dataRegistro,
      },
    });
  }
  
  update(id: number, updatePontoDto: UpdatePontoDto) {
    return `This action updates a #${id} ponto`;
  }

  remove(id: number) {
    return `This action removes a #${id} ponto`;
  }
}

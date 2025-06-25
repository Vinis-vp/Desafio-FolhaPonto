import { Module } from '@nestjs/common';
import { PontosService } from './pontos.service';
import { PontosController } from './pontos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pontos } from './entities/ponto.entity';
import { JornadaTrabalhoModule } from 'src/jornada-trabalho/jornada-trabalho.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Pontos]),
    JornadaTrabalhoModule
  ],
  controllers: [PontosController],
  providers: [PontosService],
  exports:[PontosService]
})
export class PontosModule {}

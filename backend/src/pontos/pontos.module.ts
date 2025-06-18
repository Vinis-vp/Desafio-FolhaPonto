import { Module } from '@nestjs/common';
import { PontosService } from './pontos.service';
import { PontosController } from './pontos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ponto } from './entities/ponto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ponto])],
  controllers: [PontosController],
  providers: [PontosService],
  exports:[PontosService]
})
export class PontosModule {}

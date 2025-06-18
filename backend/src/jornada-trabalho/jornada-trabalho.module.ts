import { Module } from '@nestjs/common';
import { JornadaTrabalhoService } from './jornada-trabalho.service';
import { JornadaTrabalhoController } from './jornada-trabalho.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JornadaTrabalho } from './entities/jornada-trabalho.entity';

@Module({
  imports: [TypeOrmModule.forFeature([JornadaTrabalho]),],
  controllers: [JornadaTrabalhoController],
  providers: [JornadaTrabalhoService],
  exports: [JornadaTrabalhoService],
})
export class JornadaTrabalhoModule {}

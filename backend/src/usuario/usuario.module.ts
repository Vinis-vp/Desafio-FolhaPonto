import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { Usuario } from './entities/usuario.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JornadaTrabalhoModule } from 'src/jornada-trabalho/jornada-trabalho.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([Usuario]),
    JornadaTrabalhoModule
  ],
  controllers: [UsuarioController],
  providers: [UsuarioService],
  exports:[UsuarioService]
})
export class UsuarioModule {}

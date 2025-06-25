import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { PontosService } from './pontos.service';
import { CreatePontoDto } from './dto/create-ponto.dto';
import { UpdatePontoDto } from './dto/update-ponto.dto';

@Controller('pontos')
export class PontosController {
  constructor(private readonly pontosService: PontosService) {}

  @Post()
  create(@Req() req, @Body() createPontoDto: CreatePontoDto) {
    return this.pontosService.create(req.user, createPontoDto);
  }

  @Get()
  findAll() {
    return this.pontosService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePontoDto: UpdatePontoDto) {
    return this.pontosService.update(+id, updatePontoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pontosService.remove(+id);
  }
}

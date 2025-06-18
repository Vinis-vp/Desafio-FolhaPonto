import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { JornadaTrabalhoService } from './jornada-trabalho.service';
import { CreateJornadaTrabalhoDto } from './dto/create-jornada-trabalho.dto';
import { UpdateJornadaTrabalhoDto } from './dto/update-jornada-trabalho.dto';

@Controller('jornada-trabalho')
export class JornadaTrabalhoController {
  constructor(private readonly jornadaTrabalhoService: JornadaTrabalhoService) {}

  @Post()
  create(@Body() createJornadaTrabalhoDto: CreateJornadaTrabalhoDto) {
    return this.jornadaTrabalhoService.create(createJornadaTrabalhoDto);
  }

  @Get()
  findAll() {
    return this.jornadaTrabalhoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jornadaTrabalhoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJornadaTrabalhoDto: UpdateJornadaTrabalhoDto) {
    return this.jornadaTrabalhoService.update(+id, updateJornadaTrabalhoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jornadaTrabalhoService.remove(+id);
  }
}

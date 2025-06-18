import { Test, TestingModule } from '@nestjs/testing';
import { JornadaTrabalhoController } from './jornada-trabalho.controller';
import { JornadaTrabalhoService } from './jornada-trabalho.service';

describe('JornadaTrabalhoController', () => {
  let controller: JornadaTrabalhoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JornadaTrabalhoController],
      providers: [JornadaTrabalhoService],
    }).compile();

    controller = module.get<JornadaTrabalhoController>(JornadaTrabalhoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

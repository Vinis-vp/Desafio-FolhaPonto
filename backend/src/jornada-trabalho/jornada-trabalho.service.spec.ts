import { Test, TestingModule } from '@nestjs/testing';
import { JornadaTrabalhoService } from './jornada-trabalho.service';

describe('JornadaTrabalhoService', () => {
  let service: JornadaTrabalhoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JornadaTrabalhoService],
    }).compile();

    service = module.get<JornadaTrabalhoService>(JornadaTrabalhoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

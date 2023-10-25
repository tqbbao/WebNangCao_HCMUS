import { Test, TestingModule } from '@nestjs/testing';
import { ServerBService } from './server-b.service';

describe('ServerBService', () => {
  let service: ServerBService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServerBService],
    }).compile();

    service = module.get<ServerBService>(ServerBService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

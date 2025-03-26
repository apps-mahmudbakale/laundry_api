import { Test, TestingModule } from '@nestjs/testing';
import { LaunderService } from './launder.service';

describe('LaunderService', () => {
  let service: LaunderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LaunderService],
    }).compile();

    service = module.get<LaunderService>(LaunderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

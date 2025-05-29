import { Test, TestingModule } from '@nestjs/testing';
import { LaunderAuthService } from './launder-auth.service';

describe('LaunderAuthService', () => {
  let service: LaunderAuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LaunderAuthService],
    }).compile();

    service = module.get<LaunderAuthService>(LaunderAuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

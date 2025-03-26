import { Test, TestingModule } from '@nestjs/testing';
import { LaunderController } from './launder.controller';

describe('LaunderController', () => {
  let controller: LaunderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LaunderController],
    }).compile();

    controller = module.get<LaunderController>(LaunderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

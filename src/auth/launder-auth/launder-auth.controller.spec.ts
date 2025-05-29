import { Test, TestingModule } from '@nestjs/testing';
import { LaunderAuthController } from './launder-auth.controller';

describe('LaunderAuthController', () => {
  let controller: LaunderAuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LaunderAuthController],
    }).compile();

    controller = module.get<LaunderAuthController>(LaunderAuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

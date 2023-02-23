import { Test, TestingModule } from '@nestjs/testing';

import { UserUploadResolver } from './userUpload.resolver';

describe('UserUploadResolver', () => {
  let resolver: UserUploadResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserUploadResolver],
    }).compile();

    resolver = module.get<UserUploadResolver>(UserUploadResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});

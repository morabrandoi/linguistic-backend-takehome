import { Module } from '@nestjs/common';

import { PrismaModule } from 'src/prisma';

import { UserUploadResolver } from './userUpload.resolver';
import { UserUploadService } from './userUpload.service';

@Module({
  imports: [PrismaModule],
  providers: [UserUploadService, UserUploadResolver],
  exports: [UserUploadResolver],
})
export class UserModule {}

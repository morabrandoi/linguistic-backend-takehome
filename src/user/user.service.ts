import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  findByID(id: number) {
    return this.prismaService.user.findUniqueOrThrow({
      where: {
        id,
      },
    });
  }

  findDocsByUserID(authorId: number) {
    return this.prismaService.document.findMany({
      where: {
        authorId,
      },
    });
  }

  createDocument(title: string, textBody: string, authorId: number) {
    return this.prismaService.document.create({
      data: { title, textBody, authorId },
    });
  }
}

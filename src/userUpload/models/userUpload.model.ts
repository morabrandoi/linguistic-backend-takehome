import { Field, Int, ObjectType } from '@nestjs/graphql';

import type { User as UserModel } from '@prisma/client';
import type { Document as DocumentModel } from '@prisma/client';

@ObjectType()
export class User implements UserModel {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  email: string;
}

@ObjectType()
export class Document implements DocumentModel {
  @Field(() => Int)
  id: number;

  @Field()
  title: string;

  @Field()
  textBody: string;

  @Field()
  authorId: number;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

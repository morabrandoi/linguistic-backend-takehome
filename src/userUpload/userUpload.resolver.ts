import {
  Args,
  Field,
  InputType,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';

import { Document, User } from './models/userUpload.model';
import { UserUploadService } from './userUpload.service';

@InputType()
class CreateDocumentDTO {
  @Field()
  title: string;

  @Field()
  textBody: string;

  @Field()
  authorId: number;
}

@Resolver(() => User)
export class UserUploadResolver {
  constructor(private readonly userUploadService: UserUploadService) {}

  @Query(() => User)
  async user(@Args('id') id: number) {
    return this.userUploadService.findByID(id);
  }

  // // This was for the base points
  // @Query(() => [Document])
  // async documents(@Args('id') id: number) {
  //   return this.userUploadService.findDocsByUserID(id);
  // }

  // this was for the bonus points
  @ResolveField(() => [Document])
  async documents(@Parent() user: User): Promise<Document[]> {
    const { id } = user;
    return this.userUploadService.findDocsByUserID(id);
  }

  @Mutation(() => Document)
  async saveDocument(
    @Args('input') input: CreateDocumentDTO,
  ): Promise<Document> {
    return await this.userUploadService.createDocument(input);
  }
}

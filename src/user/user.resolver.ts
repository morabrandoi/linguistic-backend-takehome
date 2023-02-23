import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { Document, User } from './models/user.model';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User)
  user(@Args('id') id: number) {
    return this.userService.findByID(id);
  }

  @Query(() => [Document])
  documents(@Args('id') id: number) {
    return this.userService.findDocsByUserID(id);
  }

  @Mutation(() => Document)
  async saveDocument(
    @Args('title') title: string,
    @Args('textBody') textBody: string,
    @Args('authorId') authorId: number,
  ): Promise<Document> {
    return await this.userService.createDocument(title, textBody, authorId);
  }
}

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

import { Document, User } from './models/user.model';
import { UserService } from './user.service';

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
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User)
  async user(@Args('id') id: number) {
    return this.userService.findByID(id);
  }

  // // This was for the base points
  // @Query(() => [Document])
  // async documents(@Args('id') id: number) {
  //   return this.userService.findDocsByUserID(id);
  // }

  // this was for the bonus points
  @ResolveField()
  async documents(@Parent() user: User): Promise<Document[]> {
    const { id } = user;
    return this.userService.findDocsByUserID(id);
  }

  @Mutation(() => Document)
  async saveDocument(
    @Args('document') document: CreateDocumentDTO,
  ): Promise<Document> {
    return await this.userService.createDocument(document);
  }
}

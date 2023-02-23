import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seed() {
  const NUM_USERS = 5;
  const users = new Array(NUM_USERS).fill(0).map(() =>
    prisma.user.create({
      data: {
        name: faker.name.fullName(),
        email: faker.internet.email(),
      },
    }),
  );
  await prisma.$transaction(users);

  // generating different numbers of docs for each user
  const documents = [];
  for (let i = 1; i < NUM_USERS + 1; i++) {
    for (let j = 1; j < i; j++) {
      const doc = prisma.document.create({
        data: {
          title: `MyTitle; User: ${i}, File:${j}`,
          textBody: `Lorem Ipsum; User: ${i}, File:${j}`,
          authorId: i,
        },
      });
      documents.push(doc);
    }
  }
  await prisma.$transaction(documents);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());

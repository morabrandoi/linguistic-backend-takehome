# The Linguistic Backend Challenge

# Table of Contents
1. [Download the Code](#Download-the-code)
2. [Run Project](#Run-Project)
3. [Interact with Project](#Interact-with-Project)
4. [Design Considerations](#Design-Considerations)


## Download the Code
In your desired shell with the desired parent directory run the command
```
git clone https://github.com/morabrandoi/linguistic-backend-takehome.git
```
and then move into the created directory with
```
cd linguistic-backend-takehome
```

## Run Project
### Build docker image
Once you have made your working directory the downloaded project run
```
docker build . -t brand0m0ra/linguistic-exercise
```
to build the docker image. This docker image has been named
`brand0m0ra/linguistic-exercise`.

### Run docker image
Now to run the docker image, in your shell run
```
docker container run -it -p 3000:3000 -p 5555:5555 --rm brand0m0ra/linguistic-exercise
```
This is binds to ports `3000` and `5555` and because of the `-it` flag you can `^C` to stop the container from running. Additionally, because of the `--rm` flag the container will destroy itself when it is stopped.

## Interact with Project
### Prisma Studio
In your browser go to [localhost:5555](localhost:5555) and you will have access to the database to see how it was populated with seeded data as well as how it will change in the following steps.

### GraphQL Playground
In your browser go to [localhost:3000/graphql](localhost:3000/graphql). Here you will see a place to type and run a query. To start, copy and paste the following query and hit run. You should see the desired output.
```
query {
  user(id: 3) {
    name
    documents {
      title
      textBody
    }
  }
}
```
In a seperate query, or by replacing the current one, copy, paste, and run the following mutation.
```
mutation saveDocument {
  saveDocument(input: {
    title: "new title heyo",
    textBody: "this should go to the user without"
    authorId: 1
  }) {
    title
  }
}
```
If you then refresh the appopriate prisma studio screen you will see this new row being added to the database.

## Design Considerations
### Current Design
One of the biggest design 'customizations' that I made was to refactor the `./src/user/` directory into `/src/userUpload/` as well the corresponding files related to this. I did this because as the scope of the current task stands, it is much more descriptive as the contents of the directory. It then makes more logical sense when the models file should contain both the model for the `user` and the model for the `document`. Similarly, functions in the `service` file spanned across models and just on the user model.

A small thing, but I also organized my `Dockerfile` to take advantage of layer caching for faster successive builds.

For the purposes of this exercise I also did not enforce a persistent DB and to compensate I modified the db seed function to also generate mock Document data.

### Future Proofing
Definitely in the 'future' as the project would grow it would make sense to seperate out the document model and user model to a stronger degree resulting in `./src/user/` and `./src/document/` as two seperate directories. It would also make sense to take advantage of the testing framework that is already built in and mock a database to test api functions in isolation.

I would also make the database persistent either by shared volume or another Postgres docker image.
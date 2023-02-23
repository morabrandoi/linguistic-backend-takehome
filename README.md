# The Linguistic Backend Challenge

## Download the Code
In your desired shell with the desired parent directory run the command
`git clone https://github.com/morabrandoi/linguistic-backend-takehome.git`
and then move into the created directory with
`cd linguistic-backend-takehome`

## Instructions to Run Project
### build docker image
Once you have made your working directory the downloaded project run
`docker build . -t brand0m0ra/linguistic-exercise`
to build the docker image. This docker image has been named `brand0m0ra/linguistic-exercise`.

### run docker image
Now to run the docker image, in your shell run
`docker container run -it -p 3000:3000 -p 5555:5555 --rm brand0m0ra/linguistic-exercise`
This is binds to ports `3000` and `5555` and because of the `-it` flag you can `^C` to stop the container from running. Additionally because of the `--rm` flag the container will destroy itself when it is stopped.

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
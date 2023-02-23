# The Linguistic Backend Challenge

If you're reading this, you've already been given instructions :wink:

query {
  user(id: 3) {
    name
    documents {
      title
      textBody
    }
  }
}

mutation saveDocument {
  saveDocument(input: {
    title: "new title heyo",
    textBody: "this should go to the user without"
    authorId: 1
  }) {
    title
  }
}
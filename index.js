const { ApolloServer, gql } = require("apollo-server");

const users = [
  {
    name: "jaga",
  },
  {
    name: "fabio",
  },
];

const typeDefs = gql`
  type User {
    name: String!
    items: [Item!]!
  }

  type Item {
    text: String!
    """
    una cosa molto importante che segue la specififa iso-stocazzo-123
    """
    xxx: Int!
  }

  type Query {
    users: [User!]!
  }
`;

const resolvers = {
  Query: {
    users(parent, args, context, info) {
      console.log(parent);
      console.log("inside user");
      return users;
    },
  },
  User: {
    items(parent) {
      console.log(parent);
      console.log("inside User.items resolver resolver");
      return [{ text: "x" }];
    },
  },
  Item: {
    xxx(parent) {
      console.log(parent);
      console.log("inside Item.xxx resolver resolver");
      return 42;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

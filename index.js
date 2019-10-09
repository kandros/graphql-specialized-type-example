const { ApolloServer, gql } = require('apollo-server')

const typeDefs = gql`
  enum TriggerType {
    RED
    GREEN
  }

  interface Trigger {
    id: ID!
    name: String!
    isActive: Boolean!
    createdAt: String!
    type: TriggerType!
  }

  type RedNested {
    nestedFieldOnlyForRed: Boolean!
  }

  type TriggerRed implements Trigger {
    id: ID!
    name: String!
    isActive: Boolean!
    createdAt: String!
    type: TriggerType!
    redField: Boolean!
    nestedRed: RedNested!
  }

  type GreenOnly {
    iLoveGreen: Boolean!
  }

  type TriggerGreen implements Trigger {
    id: ID!
    name: String!
    isActive: Boolean!
    createdAt: String!
    type: TriggerType!
    greenOnly: GreenOnly!
  }

  type Query {
    triggers: [Trigger!]!
  }
`

const triggers = [
  {
    id: 1,
    name: 'my red trigger',
    isActive: true,
    createdAt: Date.now(),
    type: 'RED',
    redField: true,
    nestedRed: {
      nestedFieldOnlyForRed: true,
    },
  },
  {
    id: 2,
    name: 'my green trigger',
    isActive: false,
    createdAt: new Date(),
    type: 'GREEN',
    greenOnly: {
      iLoveGreen: true,
    },
  },
]

const resolvers = {
  Query: {
    triggers: () => {
      console.log('triggers resolver')
      return triggers
    },
  },
  TriggerRed: {
    __isTypeOf(trigger) {
      return trigger.type === 'RED'
    },
  },
  TriggerGreen: {
    __isTypeOf(trigger) {
      return trigger.type === 'GREEN'
    },
  },
}

const server = new ApolloServer({ typeDefs, resolvers })

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})

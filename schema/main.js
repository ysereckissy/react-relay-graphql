const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLEnumType,
} = require('graphql');

const QuoteType = new GraphQLObjectType({
  name: 'Quote',
  fields: {
    id: {
      type: GraphQLString,
      resolve: obj => obj._id
    },
    text: {
      type: GraphQLString,
      resolve: obj => obj.text
    },
    author: {
      type: GraphQLString,
      resolve: obj => obj.author
    }
  }
})
const queryType = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    allQuotes: {
      type: GraphQLList(QuoteType),
      description: 'A list of the quotes in the database',
      resolve: (_, args, { db }) => db.collection('quotes').find().toArray()
    },
    usersCount: {
      description: 'Total number of users in the database',
      type: GraphQLInt,
      resolve: (_, args, { db }) => db.collection('users').count()
    },
  }
});
const exampleSchema = new GraphQLSchema({
  query: queryType,
});

module.exports = exampleSchema;
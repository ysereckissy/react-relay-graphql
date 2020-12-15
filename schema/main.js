const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLEnumType,
} = require('graphql');

const queryType = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
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
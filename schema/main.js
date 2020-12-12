const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
} = require('graphql');

const queryType = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    hello: {
      type: GraphQLString,
      resolve: () => 'World'
    }
  }
});
const exampleSchema = new GraphQLSchema({
  /// root query & root mutation definitions go here!
  query: queryType,
});

module.exports = exampleSchema;
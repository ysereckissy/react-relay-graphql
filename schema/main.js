const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
} = require('graphql');

const roll = () => Math.floor(6*Math.random()) + 1;
const queryType = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    hello: {
      type: GraphQLString,
      resolve: () => 'World'
    },
    diceRoll: {
      type: new GraphQLList(GraphQLInt),
      resolve: () => [roll(), roll()],
    }
  }
});
const exampleSchema = new GraphQLSchema({
  /// root query & root mutation definitions go here!
  query: queryType,
});

module.exports = exampleSchema;
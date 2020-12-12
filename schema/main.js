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
      args: {
        count: {
          type: GraphQLInt,
          defaultValue: 2
        }
      },
      resolve: (_, args) => new Array(args.count).fill(args.count).map((_) => roll()),
    }
  }
});
const exampleSchema = new GraphQLSchema({
  /// root query & root mutation definitions go here!
  query: queryType,
});

module.exports = exampleSchema;
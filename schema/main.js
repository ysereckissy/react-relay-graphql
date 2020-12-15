const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLEnumType,
} = require('graphql');

const roll = () => Math.floor(6*Math.random()) + 1;
const toTitleCase = str => {
  return str.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
};
const LetterCaseType = new GraphQLEnumType({
  name: 'LetterCase',
  values: {
    TITLE: {value: 'title'},
    UPPER: {value: 'upper'},
    LOWER: {value: 'lower'}
  
}});
const EmployeeType = new GraphQLObjectType({
  name: 'Employee',
  fields: () => ({
    name: {
      type: GraphQLString,
      args: {
        upperCase: {
          type: GraphQLBoolean,
          defaultValue: false,
        }
      },
      resolve: (obj, { upperCase }) => {
        const fullName = `${obj.firstName} ${obj.lastName}`;
        return upperCase ? fullName.toUpperCase() : fullName;
      },
    },
    nameForCase: {
      type: GraphQLString,
      args: {
        letterCase: {type: LetterCaseType}
      },
      resolve: (obj, args) => {
        const fullName = `${obj.firstName} ${obj.lastName}`;
        switch(args.letterCase) {
          case 'lower':
            return fullName.toLowerCase();
          case 'upper':
            return fullName.toUpperCase();
          case 'title':
            return toTitleCase(fullName);
          default:
            return fullName;
        }
      }
    },
    boss: {
      type: EmployeeType
    }
  })
});

const exampleEmployee = {
  firstName: 'jane',
  lastName: 'Doe'
}
const queryType = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    hello: {
      type: GraphQLString,
      resolve: () => 'World' },
    diceRoll: {
      description: '**Simulate** a dice roll determined by count',
      type: new GraphQLList(GraphQLInt),
      args: {
        count: {
          type: GraphQLInt,
          defaultValue: 2
        }
      },
      resolve: (_, args) => new Array(args.count).fill(args.count).map((_) => roll()),
    },
    usersCount: {
      description: 'Total number of users in the database',
      type: GraphQLInt,
      resolve: (_, args, { db }) => db.collection('users').count()
    },
    exampleEmployee: {
      type: EmployeeType,
      resolve: () => exampleEmployee
    }
  }
});
const exampleSchema = new GraphQLSchema({
  /// root query & root mutation definitions go here!
  query: queryType,
});

module.exports = exampleSchema;
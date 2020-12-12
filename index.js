const { graphql } = require('graphql');
const readline = require('readline');
const exampleSchema = require('./schema/main');

const rli = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rli.question('Client Request: ', inputQuery => {
  graphql(exampleSchema, inputQuery).then(result => {
    console.log('Server Answer: ', result.data);
  });
  rli.close();
})
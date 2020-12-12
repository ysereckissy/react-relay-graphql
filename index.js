const { graphql } = require('graphql');
const readline = require('readline');
const { MongoClient } = require('mongodb');
const assert = require('assert');

const exampleSchema = require('./schema/main');

const DB_URL = 'mongodb://localhost:27017';
MongoClient.connect(DB_URL, (err, client) => {
  assert.equal(null, err);
  console.log('Connected to MongoDB server');
  /// the readline interface code goes here!
  const rli = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rli.question('Client Request: ', inputQuery => {
    const db = client.db('test');
    graphql(exampleSchema, inputQuery, {}, {db}).then(result => {
      console.log('Server Answer: ', result.data);
      client.close(() => rli.close());
    });
  })
})
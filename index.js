const { graphql } = require('graphql');
const { MongoClient } = require('mongodb');
const assert = require('assert');
const { graphqlHTTP } = require('express-graphql');
const express = require('express');

const exampleSchema = require('./schema/main');

App = express();

const DB_URL = 'mongodb://localhost:27017';
MongoClient.connect(DB_URL, (err, client) => {
  assert.equal(null, err);
  console.log('Connected to MongoDB server');
  const db = client.db('test');
  App.use('/graphql', graphqlHTTP({
    schema: exampleSchema,
    context: { db },
    graphiql: true
  }));
  App.listen(5000, () => console.log('Running Express.js on port 5000'));
});
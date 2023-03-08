const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;


const getAllIndividuals = async (req, res) => {
    const result = await mongodb.getDb('videoGames').db('videoGames').collection('individuals').find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  };

const getSingleIndividual = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb.getDb('videoGames').db('videoGames').collection('individuals').find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

const createIndividual = async (req, res) => {
  const individualData = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    username: req.body.username,
    level: req.body.level,
    gameNumber: req.body.gameNumber,
    friends: req.body.friends
  };
  const result = await mongodb.getDb('videoGames').db('videoGames').collection('individuals').insertOne(individualData);
  console.log(`New individual created with the following Id: ${result.insertedId}`);
  if (result.acknowledged) {
    res.status(201).json(result);
  } else {
    res.status(500).json(result.error || 'An error occurred while creating the game.');
  }
};
module.exports = { getAllIndividuals, getSingleIndividual, createIndividual}

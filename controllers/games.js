const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;


const getAllGames = async (req, res) => {
    const result = await mongodb.getDb('videoGames').db('videoGames').collection('games').find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  };

const getSingleGame = async (req, res) => {
  const itemId = new ObjectId(req.params.id);
  const result = await mongodb.getDb('videoGames').db('videoGames').collection('games').find({ _id: itemId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

const createGame = async (req, res) => {
  const gameData = {
    title: req.body.title,
    size: req.body.size,
    multiplayer: req.body.multiplayer,
    controllerSupport: req.body.controllerSupport,
    developer: req.body.developer,
    publisher: req.body.publisher,
    releaseDate: req.body.releaseDate
  };
  const result = await mongodb.getDb('videoGames').db('videoGames').collection('games').insertOne(gameData);
  console.log(`New Game created with the following Id: ${result.insertedId}`);
  if (result.acknowledged) {
    res.status(201).json(result);
  } else {
    res.status(500).json(result.error || 'An error occurred while creating the game.');
  }
};
  
module.exports = { getAllGames, getSingleGame, createGame}

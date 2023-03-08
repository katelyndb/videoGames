const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;


const getAllGames = async (req, res) => {
    const result = await mongodb.getDb().db('videoGames').collection('games').find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  };

const getSingleGame = async (req, res) => {
  const itemId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db('videoGames').collection('games').find({ _id: itemId });
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
  const result = await mongodb.getDb().db('videoGames').collection('games').insertOne(gameData);
  console.log(`New Game created with the following Id: ${result.insertedId}`);
  if (result.acknowledged) {
    res.status(201).json(result);
  } else {
    res.status(500).json(result.error || 'An error occurred while creating the game.');
  }
};

const updateGameById = async(req, res) => {
  const gameData = {
    title: req.body.title,
    size: req.body.size,
    multiplayer: req.body.multiplayer,
    controllerSupport: req.body.controllerSupport,
    developer: req.body.developer,
    publisher: req.body.publisher,
    releaseDate: req.body.releaseDate
  };
  const itemId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db('videoGames').collection('games').updateOne({ _id: itemId },{ $set: gameData });
  console.log(`${result.matchedCount} document(s) matched the query criteria`);
  console.log(`${result.modifiedCount} was/were updated`);
  if (result.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(result.error || 'Some error occurred while updating the contact.');
  }
}


const deleteGameById = async(req, res) => {
  const itemId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db('videoGames').collection('games').deleteOne({ _id: itemId }, true);
  console.log(`${result.matchedCount} document(s) matched the query criteria`);
  console.log(result);
  if (result.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(result.error || 'Error occured while trying to delete the contact.');
  }
  
 
}
module.exports = { getAllGames, getSingleGame, createGame, updateGameById, deleteGameById}

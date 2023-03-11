const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;


const getAllIndividuals = async (req, res) => {
try {
    const result = await mongodb.getDb().db('videoGames').collection('individuals').find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
} catch (err) {
  res.status(500).json('Error occured while trying to get all individuals information. ' + err);
}   
  };

const getSingleIndividual = async (req, res) => {
try {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db('videoGames').collection('individuals').find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
} catch (err) {
  res.status(500).json('Error occured while trying to get the individual information. ' + err);
}   
};

const createIndividual = async (req, res) => {
try {
  const individualData = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    username: req.body.username,
    level: req.body.level,
    gameNumber: req.body.gameNumber,
    friends: req.body.friends
  };
  const result = await mongodb.getDb().db('videoGames').collection('individuals').insertOne(individualData);
  console.log(`New individual created with the following Id: ${result.insertedId}`);
  if (result.acknowledged) {
    res.status(201).json(result);
  } else {
    res.status(500).json(result.error || 'An error occurred while creating the game.');
  }
} catch (err) {
  res.status(500).json('Error occured while trying to create the individual. ' + err);
}   
};

const updateIndividualById = async(req, res) => {
try {
  const individualData = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    username: req.body.username,
    level: req.body.level,
    gameNumber: req.body.gameNumber,
    friends: req.body.friends
  };
  const userId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db('videoGames').collection('individuals').updateOne({ _id: userId },{ $set: individualData });
  console.log(`${result.matchedCount} document(s) matched the query criteria`);
  console.log(`${result.modifiedCount} was/were updated`);
  if (result.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(result.error || 'Some error occurred while updating the contact.');
  }
}catch (err) {
  res.status(500).json('Error occured while trying to update the individual. ' + err);
}  
};

const deleteIndividualById = async(req, res) => {
try {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db('videoGames').collection('individuals').deleteOne({ _id: userId }, true);
  console.log(`${result.matchedCount} document(s) matched the query criteria`);
  console.log(result);
  if (result.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(result.error || 'Error occured while trying to delete the contact.');
  }
}catch (err) {
  res.status(500).json('Error occured while trying to delete the individual. ' + err);
}  
};

module.exports = { getAllIndividuals, getSingleIndividual, createIndividual, updateIndividualById, deleteIndividualById}

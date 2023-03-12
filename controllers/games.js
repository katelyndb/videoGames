const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
// Validator Stuff
const express = require("express");
const { Validator } = require("express-json-validator-middleware");
const { validate } = new Validator();
const { gameSchema } = require('../validate.js');
//


const getAllGames = async (req, res) => {
try {
  const result = await mongodb.getDb().db('videoGames').collection('games').find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  } catch (err) {
    res.status(500).json('Error occured while trying to get all game information. ' + err);
  }
};

const getSingleGame = async (req, res) => {
try {
  const itemId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db('videoGames').collection('games').find({ _id: itemId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
} catch (err) {
  res.status(500).json('Error occured while trying to get the game information. ' + err);
}
};

const createGame = async (req, res) => {

try {
  validate({ body: gameSchema });
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
} catch (err) {
  res.status(500).json('Error occured while trying to create the game. ' + err);
}
};

const updateGameById = async(req, res) => {
try {
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
    res.status(500).json(result.error || 'An error occurred while updating the game.');
  }
} catch (err) {
  res.status(500).json('Error occured while trying to update the game. ' + err);
}
}


const deleteGameById = async(req, res) => {
try {
  const itemId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db('videoGames').collection('games').deleteOne({ _id: itemId }, true);
  console.log(`${result.matchedCount} document(s) matched the query criteria`);
  console.log(result);
  if (result.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(result.error || 'Error occured while trying to delete the game.');
  }
} catch (err) {
  res.status(500).json('Error occured while trying to delete the game. ' + err);
}
}
module.exports = { getAllGames, getSingleGame, createGame, updateGameById, deleteGameById}

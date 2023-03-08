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
  const userId = new ObjectId(req.params.id);
  const result = await mongodb.getDb('videoGames').db('videoGames').collection('games').find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });

};
  
module.exports = { getAllGames, getSingleGame}

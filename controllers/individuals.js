const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;


const getAllIndividuals = async (req, res) => {
    const result = await mongodb.getDb('videoGames').db('videoGames').collection('individuals').find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  };
  
module.exports = { getAllIndividuals}

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
  
module.exports = { getAllIndividuals, getSingleIndividual}

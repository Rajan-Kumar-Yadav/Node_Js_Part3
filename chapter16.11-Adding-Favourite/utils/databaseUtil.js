const mongo = require('mongodb');
const { get } = require('../routes/storeRouter');


const MongoClient = mongo.MongoClient;

const MONGO_URL = "mongodb+srv://Rajan:Rajan@rajancoding.hthpzj0.mongodb.net/?retryWrites=true&w=majority&appName=RajanCoding"

let _db;
const mongoConnect = (callback) => {
MongoClient.connect(MONGO_URL)
.then(client => {
   callback();
   _db = client.db('airbnb')
}).catch(err => {
  console.log('Error while connecting to Mongo',err)
})
}

const getDB = () => {
  if (!_db) {
    throw new Error('Mongo not connected');
  }
  return _db;
}
exports.mongoConnect = mongoConnect;
exports.getDB = getDB;
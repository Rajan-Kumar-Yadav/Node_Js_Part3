
const mongoose = require('mongoose');

const homeSchema = mongoose.Schema({
  houseName: {type: String, require: true},
  price: {type: Number, require: true},
  location:{type: String, require:true},
  rating:{type: Number, require:true},
  photoUrl: String,
  description: String,
})

module.exports = mongoose.model('Home', homeSchema)


 


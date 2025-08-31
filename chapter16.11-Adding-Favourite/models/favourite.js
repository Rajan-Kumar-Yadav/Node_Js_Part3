const { getDB } = require("../utils/databaseUtil");

 




module.exports = class Favourite {

   constructor(houseId) {
    this.houseId = houseId;
 }

 save(){
  const db = getDB();
  return db.collection('Favourites').insertOne(this);
 }


 static getFavourites() {
     const db = getDB();
  return db.collection('Favourites').find().toArray();
 
 }


 static deleteById(delHomeId) {
       const db = getDB();
    return db.collection('Favourites')
    .deleteOne({houseId:delHomeId });
 }
}
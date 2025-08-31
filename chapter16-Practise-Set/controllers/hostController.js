const Home = require("../models/home");


exports.getAddHome = (req,res,next) => {
res.render('host/edit-home', {pageTitle: 'add Home to airbnb' , currentPage: 'addHome',editing: false,})
}

exports.getEditHome = (req,res,next) => {
 const homeId = req.params.homeId;
  const editing = req.query.editing === 'true';
  Home.findById(homeId).then(home  => {
    if (!home) {
      console.log("Home not found for editing.");
     return res.redirect("/host/host-home-list");
    }
     console.log(homeId,editing, home)
    res.render('host/edit-home', { home: home, pageTitle: 'Edit your Home' , currentPage: 'host-homes',editing: editing})
  })
 
}
exports.getHostHomes = (req, res, next) => {
  Home.fetchAll().then((registeredHomes) => {
    res.render("host/host-home-list", {
      registeredHomes: registeredHomes,
      pageTitle: "Host Home List",
      currentPage: "host-homes",
    })
});
};
exports.postAddHome = (req,res,next) => {
  console.log("Home Registration successful for:",req.body );
  const {houseName, price, location, rating, photoUrl,description} = req.body;
const home = new Home(houseName, price, location, rating, photoUrl,description)
 home.save().then(() => {
  console.log('Home saved successFully')
 });
    res.redirect('/host/host-home-list');
}
exports.postEditHome = (req,res,next) => {
  const { id,houseName, price, location, rating, photoUrl, description} = req.body;
const home = new Home( houseName, price, location, rating, photoUrl,description,id)
 home.save().then(result => {
  console.log('Home updated',result);
 });
 
  res.redirect('/host/host-home-list');
}

exports.postDeleteHome = (req,res,next) => {
  const homeId = req.params.homeId;
  console.log("came to delete",homeId)
  Home.deleteById(homeId).then(() => {
     res.redirect('/host/host-home-list');
  }).catch(error => {
    console.log('Error while deleting', error)
  })
   
}




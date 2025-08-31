
//core Module 
const path = require('path');

// External Module

const  express = require('express')

// Local Module
const storeRouter = require('./routes/storeRouter');

const hostRouter = require('./routes/hostRouter');
//Local Module
const rootdir = require("./utils/pathUtil")
const errorsController = require("./controllers/error");
const {mongoConnect} = require('./utils/databaseUtil');





const app = express();

app.set('view engine', 'ejs')
app.set('views','views')
  
app.use(express.urlencoded());

 app.use(express.static(path.join(rootdir,"public")))
app.use(storeRouter);
app.use("/host",hostRouter);



app.use(errorsController.pageNotFound)


const PORT = 3000;
mongoConnect(() => {
 
 app.listen(PORT, () => {
  console.log(`Server running on address http://localhost:${PORT}`)
})
})
 


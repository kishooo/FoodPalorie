const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
//const app = express();



const bodyParser = require("body-parser");
const request = require("request");
//let ejs = require('ejs');

// routes
const users = require('./routes/api/users')
const foods = require('./routes/api/foods')

const app = express();
app.set('view engine','ejs');

// DB Config
const db = require('./config/keys').mongoURI

// Connect to mongo
mongoose
    .connect(db, { useUnifiedTopology: true ,useNewUrlParser: true})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log(err))

// Init middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(bodyParser.urlencoded({extended: true}));
var calorie=0;
var remcalorie=2500;
var error="";

// Direct to Route Handlers
app.use('/api/users', users)
app.use('/api/foods', foods)

//app.use((req,res) => res.status(404).send(`<h1>Can not find what you're looking for</h1>`))

app.get("/",function(req,res){
  res.sendFile(__dirname + "/index.html");
  //res.render("list",{calorie:remcalorie});
});


app.post("/calorie",function(req,res){
  //console.log(req.body.crypto);
  //request("https://api.edamam.com/api/nutrition-details?app_id=${2f52c44d}&app_key=${8daf27f1bf6697d99ddf0223cac7971c}&ingr=1%20large%20apple",function(error,response,body){
  //var request = require("request");
  var request = require("request");
  var search=req.body.text;
  var options = {
    method: 'GET',
    url: 'https://edamam-food-and-grocery-database.p.rapidapi.com/parser',
    qs: {ingr: ''+search},
    headers: {
      'x-rapidapi-host': 'edamam-food-and-grocery-database.p.rapidapi.com',
      'x-rapidapi-key': '4af14b1073msh8bfd6338eaa312ep1c0a4djsn8a2c33dea702'
    }
  };

  request(options, function (error, response, body) {
    var data = JSON.parse(body);
    if (error){
    //alert("cannot found");
      throw new Error(error);
    }
    else{
    try {
        //res.render("list",{error:error});
      calorie=data.hints[0].food.nutrients.ENERC_KCAL;
         // Code to run
         remcalorie=remcalorie-calorie;
         res.render("list",{calorie:remcalorie});
       	console.log(calorie);
         console.log(req.body.text);
         //break;
      }

      catch (e) {
         // Code to run if an exception occurs
         //
         //error="cannot find";

         console.log("cannot find");
         res.render("error",{data:req.body.text});
         //res.sendFile(__dirname + "/error.html")
         //res.redirect("/calorie");
         //alert("cannot find");
         //break;
      }
  }
  });
    //console.log(response);
    //var data = JSON.parse(body);
    // var price =data.results[0].health;

    //console.log(price);
});
app.get("/register",function(req,res){
  res.sendFile(__dirname + "/register.html");
});

app.post("/register",async (req,res) => {

  const user = {
  "userName":req.body.userName,
  "password":req.body.password,
  "caloriesNeeded": req.body.caloriesNeeded
  };
  var myJSON = JSON.stringify(user);
  try {
        await axios.post('http://localhost:3000/api/users/register',user);
     } catch(error) {
       console.log(error);
  }
});
app.get("/login",function(req,res){
  res.sendFile(__dirname+"/login.html");
})
app.get("/calorie",function(req,res){
  //res.sendFile(__dirname + "/index.html");
  res.render("list",{calorie:remcalorie});
});
app.post()
const port = 3000;
//const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}`));

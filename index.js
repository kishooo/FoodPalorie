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
app.use(express.static("public"));
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
app.use(express.static("public"));
var calorie=0;
var remcalorie=2500;
var error="";
var flag=0;
var falglogin=0;
var id="";
//var myData='';
// Direct to Route Handlers
app.use('/api/users', users)
app.use('/api/foods', foods)

//app.use((req,res) => res.status(404).send(`<h1>Can not find what you're looking for</h1>`))

app.get("/",function(req,res){
  //res.sendFile(__dirname + "/index.html");
  //res.sendFile(__dirname+"/login1.html");
  res.redirect("/login");
  //res.render("list",{calorie:remcalorie});
});



app.get("/register",function(req,res){
  res.sendFile(__dirname + "/register.html");
});

app.post("/register",async function(req,res) {
  const user = {
  "userName":req.body.userName,
  "password":req.body.password,
  "caloriesNeeded": req.body.caloriesNeeded
  };
  var myJSON = JSON.stringify(user);
  try {
          await axios.post('http://localhost:3000/api/users/register',user).then(res => {
          res.data.msg == 'user was created successfully' ?f=1: f=0
           //console.log("check point");
       })

     } catch(error) {
       //console.log(error);
       f=0;

  }
  // if(req.body.caloriesNeeded<50){
  //   res.write("<h1>you calorie should be greater than 50</h1>");
  // }
  if(f==1){
    res.redirect("/login");
  }else{
    res.write("<h1>already exist/calorie is not a number</h1>");
    console.log("error");

  }
});
// function response(res){
//   if(res.msg=="user was created successfully"){
//     //res.redirect("/");
//    console.log("user was created");
// }
app.post("/login",async function(req,res) {
  const user = {
  "userName":req.body.userName,
  "password":req.body.password,
  //"caloriesNeeded": req.body.caloriesNeeded
  };
  var myJSON = JSON.stringify(user);
  try {
        await axios.post('http://localhost:3000/api/users/login',user).then(res => {
          res.data.msg == 'login successful' ?/*flogin=1: flogin=0*/myData = res.data:myData=''
          // if(res.data.msg == 'Member found successfully'){
          //   console.log("login successfully");
          // }else{
          //   console.log("error");
          // }
          //axios.get('https://api.github.com/users/mapbox%27)
           //console.log("check point");
       })

     } catch(error) {
       //flogin=0;
       myData='';
     }
     console.log(myData);
  if(myData!=""){
    id=myData.data._id;
    remcalorie = myData.data.caloriesNeeded;
    console.log(remcalorie);
    res.redirect("/calorie" /*+ myData.data._id*/);

  //   //console.log(res.data);
   }else{
    res.write("<h1>password or username incorrect</h1>");
   }
})
app.post("/calorie",function(req,res){

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
      throw new Error(error);
    }
    else{
    try {
      calorie=data.hints[0].food.nutrients.ENERC_KCAL;
         remcalorie=remcalorie-calorie;
         res.render("list",{calorie:remcalorie});
       	console.log(calorie);
         console.log(req.body.text);
      }

      catch (e) {
         // Code to run if an exception occurs
         //
         //error="cannot find";

         console.log("cannot find");
         res.render("error",{data:req.body.text});
      }
  }
  });
    //console.log(response);
    //var data = JSON.parse(body);
    // var price =data.results[0].health;
    //console.log(price);
});
app.get("/login",function(req,res){
  res.sendFile(__dirname+"/login1.html");
  //res.render("login");
})
app.get("/calorie",function(req,res){
  //res.sendFile(__dirname + "/index.html");
  //var id =req.body.param.;
  res.render("list",{calorie:remcalorie});
});
//app.post()
const port = 3000;
//const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}`));

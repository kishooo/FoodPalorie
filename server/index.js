const express = require('express');
//const app = express();

const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
  res.sendFile(__dirname + "/index.html");
})
app.post("/",function(req,res){
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
  	if (error) throw new Error(error);
    var data = JSON.parse(body);
    var calorie=data.hints[0].food.nutrients.ENERC_KCAL;
  	console.log(calorie);
    console.log(req.body.text);
  });


    //console.log(response);
    //var data = JSON.parse(body);
    // var price =data.results[0].health;

    //console.log(price);
});
const port = 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));

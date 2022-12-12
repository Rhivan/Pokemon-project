var cors = require('cors');
const express = require("express");
const dbo = require("./db");
const app = express();
app.use(cors())
const port = 4444;
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();


dbo.connectToServer();

app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, function () {
  console.log(`App listening on port ${port}!`);
});


/* index.js code before... */
app.get("/pokemon/list", function (req, res) {
  //on se connecte à la DB MongoDB
  const dbConnect = dbo.getDb();
  //premier test permettant de récupérer mes pokemons !
  dbConnect
    .collection("pokemon")
    .find({}) // permet de filtrer les résultats
    /*.limit(50) // pourrait permettre de limiter le nombre de résultats */
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send("Error getting pokemons!");
      } else {
        res.json(result);
      }
    })
    .catch(err=>res.json(err));
    /*
    Bref lisez la doc, 
    il y a plein de manières de faire ce qu'on veut :) 
    */
    
});


app.post('/pokemon/insert', jsonParser, (req, res) => {
  const body = req.body;
  console.log('Got body:', body);
  const dbConnect = dbo.getDb();
  dbConnect
  .collection("pokemon")
  .insertOne(body)
  .then(function(result, err){
      if (err) {
        res.status(400).send("Error inserting pokemons!");
      } else {
        res.json(result);
      }
    })
    .catch(err=>res.json(err));

  //on code ensuite l'insertion dans mongoDB, lisez la doc hehe !!
  res.json(body);
});

app.delete('/pokemon/delete', jsonParser, (req, res) => {
  const body = req.body;
  console.log('Got body:', body);
  const dbConnect = dbo.getDb();
  dbConnect
  .collection("pokemon")
  .deleteOne(body)
  .then(function(result, err){
      if (err) {
        res.status(400).send("Error deleting pokemons!");
      } else {
        res.json(result);
      }
    })
    .catch(err=>res.json(err));
});

app.post('/pokemon/update', jsonParser, (req, res) => {
  const body = req.body;
  const oldvalue = req.body.oldvalue;
  const filter = { name: oldvalue };
  const updateDoc = {
    $set: {
      name: req.body.newvalue
    }
  }
  console.log('Got body:', body);
  const dbConnect = dbo.getDb();
  dbConnect
  .collection('pokemon')
  .updateOne(filter,updateDoc)
  .then(function(result, err){
    if (err) {
      res.status(400).send("Error updating pokemons!");
    } else {
      res.json(result);
    }
  })
  .catch(err=>res.json(err));

});


//-------POKEDEX-------

app.get("/pokedex/list", function (req, res) {
  //on se connecte à la DB MongoDB
  const dbConnect = dbo.getDb();
  //premier test permettant de récupérer mes pokemons !
  dbConnect
    .collection("pokedex")
    .find({}) // permet de filtrer les résultats
    /*.limit(50) // pourrait permettre de limiter le nombre de résultats */
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send("Error inserting pokemons!");
      } else {
        res.json(result);
      }
    })
    .catch(err=>res.json(err));
    /*
    Bref lisez la doc, 
    il y a plein de manières de faire ce qu'on veut :) 
    */
    
});

app.post('/pokedex/insert', jsonParser, (req, res) => {
  const body = req.body;
  console.log('Got body:', body);
  const dbConnect = dbo.getDb();
  dbConnect
  .collection("pokedex")
  .insertOne(body)
  .then(function(result, err){
      if (err) {
        res.status(400).send("Error inserting pokemons!");
      } else {
        res.json(result);
      }
    })
    .catch(err=>res.json(err));
});

app.delete('/pokedex/delete', jsonParser, (req, res) => {
  const body = req.body;
  console.log('Got body:', body);
  const dbConnect = dbo.getDb();
  dbConnect
  .collection("pokedex")
  .deleteOne(body)
  .then(function(result, err){
      if (err) {
        res.status(400).send("Error deleting pokemons!");
      } else {
        res.json(result);
      }
    })
    .catch(err=>res.json(err));
});

/*---------TYPES----------*/

app.get("/types/list", function (req, res) {
  const dbConnect = dbo.getDb();
  dbConnect
    .collection("types")
    .find({})
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send("Error fetching pokemons types!");
      } else {
        res.json(result);
      }
    })
    .catch(err=>res.json(err));
    
});

app.post('/types/insert', jsonParser, (req, res) => {
  const body = req.body;
  console.log('Got body:', body);
  const dbConnect = dbo.getDb();
  dbConnect
  .collection("types")
  .insertOne(body)
  .then(function(result, err){
      if (err) {
        res.status(400).send("Error inserting types!");
      } else {
        res.json(result);
      }
    })
    .catch(err=>res.json(err));

  
});

app.post('/types/update', jsonParser, (req, res) => {
  const body = req.body;
  const oldvalue = req.body.oldvalue;
  const filter = { type: oldvalue };
  const updateDoc = {
    $set: {
      type: req.body.newvalue
    }
  }
  console.log('Got body:', body);
  const dbConnect = dbo.getDb();
  dbConnect
  .collection('types')
  .updateOne(filter,updateDoc)
  .then(function(result, err){
    if (err) {
      res.status(400).send("Error updating types!");
    } else {
      res.json(result);
    }
  })
  .catch(err=>res.json(err));

});

app.delete('/types/delete', jsonParser, (req, res) => {
  const body = req.body;
  console.log('Got body:', body);
  const dbConnect = dbo.getDb();
  dbConnect
  .collection("types")
  .deleteOne(body)
  .then(function(result, err){
      if (err) {
        res.status(400).send("Error deleting types!");
      } else {
        res.json(result);
      }
    })
    .catch(err=>res.json(err));
});
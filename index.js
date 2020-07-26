const express = require('express');
const app = express();
const compression = require('compression');
const { default: axios } = require('axios');
const { getMatchingIngredients } = require('./sql/db');
// bar code reader stuffs
// const Quagga = require('quagga'); 

// middleware
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static(__dirname + "/public"));
app.use(compression());

if (process.env.NODE_ENV != 'production') {
    app.use(
        '/bundle.js',
        require('http-proxy-middleware')({
            target: 'http://localhost:8081/'
        })
    );
} else {
    app.use('/bundle.js', (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

// mongo stuff
const MongoClient = require('mongodb').MongoClient;
const mongoUrl = "mongodb://localhost:27017/";

/*  -- template test code
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("test");
  var query = { _id: "3261830123377" };
  var result = dbo.collection("products").find(query).toArray(function(err, result) {
    if (err) {
        console.log("Db Error: ", err); 
        throw err;
    }
    console.log(result);
    db.close();
  });
});*/

// Route(s)

app.post("/getIngredientsInfo", (req, res)=>{
    let productCode = req.body.codeToLookup;
    MongoClient.connect(mongoUrl, function(err, db) {
        if (err) throw err;
        var dbo = db.db("test");
        var query = { _id: productCode };
        console.log("Before mongo lookup: code is", productCode);
        var result = dbo.collection("products").find(query).toArray(function(err, result) {
            
            console.log("yAY");
            // console.log(result);
            if (err) {
                console.log("Db Error: ", err); 
                throw err;
            }

            // TODO: check for result.length, must be >0

            let ingredients = result[0].ingredients_tags;
            console.log("Pre-processing of ingredients:", ingredients);
            for (let i=0; i<ingredients.length; i++) {
                if (!(ingredients[i].startsWith("en:") || ingredients[i].startsWith("de:")))  {
                    // TODO: res.json ("don't know this shit"), then return
                    console.log("It's a bust!", ingredients[i]);
                }
            }
            for (let j=0; j<ingredients.length; j++) {
                ingredients[j]=ingredients[j].substring(3);
                ingredients[j]= ingredients[j].replace(/\-/g, " ");  // replaces all "-" with " "
            }
            console.log("Post-processing of ingredients:", ingredients);

            getMatchingIngredients(ingredients, 1).then (result=> {
                console.log("Db match:", result.rows);
                // res.json ("safe to eat but only once"), then return
            }).catch(error => {
                console.log(error);
            });
            
            // TODO: res.json ("yeah whatever"), then return

            res.json(result);
            // console.log(result);
            db.close();
        });
  });
})







app.get('*', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.listen(8080, function() {
    console.log("And there was much rejoicing");
});
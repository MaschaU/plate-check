const express = require('express');
const app = express();
const compression = require('compression');
const { default: axios } = require('axios');
const { getMatchingIngredients } = require('./sql/db');

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

// MongoDB stuff
const MongoClient = require('mongodb').MongoClient;
const mongoUrl = "mongodb://localhost:27017/";

// MongoDB template test code
// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   var dbo = db.db("test");
//   var query = { _id: "3261830123377" };
//   var result = dbo.collection("products").find(query).toArray(function(err, result) {
//     if (err) {
//         console.log("Db Error: ", err); 
//         throw err;
//     }
//     console.log(result);
//     db.close();
//   });
// });

// Route(s)

// Route for the client to inquire about a product barcode. We start by looking up
// the barcode number in the MongoDB with open food facts we obtained, and then
// move on from there to check the ingredient list of the product against a list
// of Very Bad Ingredients for people with this condition.
//
// This second list is located in another database, Postgres, that we maintain.

app.post("/getIngredientsInfo", (req, res)=>{
    let productCode = req.body.codeToLookup;
    MongoClient.connect(mongoUrl, function(err, db) {
        if (err) throw err;
        var dbo = db.db("test");
        var query = { _id: productCode };
        console.log("Before mongo lookup: code is", productCode);
        var result = dbo.collection("products").find(query).toArray(function(err, result) {
            // console.log("yAY");
            console.log(result);
            if (err) {
                console.log("Db Error: ", err); 
                throw err;
            }
            // If we don't have this product code in the database,
            // we must abort trying to interpret it and return error
            if (result.length < 1) {
                res.json ({display: "unknown", barcode: productCode});
                db.close();
                return;
            }
            // We have the list of ingredients. Make sure they're in a somewhat
            // civilized language that we can understand
            let ingredients = result[0].ingredients_tags;
            let productName = result[0].product_name;
            // console.log("Pre-processing of ingredients:", ingredients);
            for (let i=0; i<ingredients.length; i++) {
                if (!(ingredients[i].startsWith("en:") || ingredients[i].startsWith("de:")))  {
                    res.json ({display: "error", productName: productName, barcode: productCode});
                    db.close();
                    return;
                    // console.log("It's a bust!", ingredients[i]);
                }
            }
            // Standardize our list of ingredients to match the format of the
            // database table
            for (let j=0; j<ingredients.length; j++) {
                ingredients[j]=ingredients[j].substring(3);
                ingredients[j]= ingredients[j].replace(/\-/g, " ");  // replaces all "-" with " "
            }
            // console.log("Post-processing of ingredients:", ingredients);
            // We're retrieving ALL rows in the database that match ANY of our ingredients.
            // We're doing this via the "=ANY(array)" SQL function in the db.js file.
            // If we get zero hits, there's nothing harmful in the ingredients list.
            // One or more rows returned, and we must tell the client that this particular
            // food item is unsafe for consumption for people with this condition.

            getMatchingIngredients(ingredients, 1).then (result=> {
                if (result.rows.length > 0) {
                    console.log("Db match:", result.rows);
                    res.json ({display: "unsafe", productName: productName, matches: result.rows, barcode: productCode});
                } else {
                    res.json({display: "safe", productName: productName, barcode: productCode});
                }
            }).catch(error => {
                console.log(error);
            });
            
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
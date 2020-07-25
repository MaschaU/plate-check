const express = require('express');
const app = express();
const compression = require('compression');
const { default: axios } = require('axios');
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
        var result = dbo.collection("products").find(query).toArray(function(err, result) {
        if (err) {
            console.log("Db Error: ", err); 
            throw err;
        }
        res.json(result);
        console.log(result);
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
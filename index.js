const express = require('express');
const app = express();
const compression = require('compression');
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







app.get('*', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.listen(8080, function() {
    console.log("And there was much rejoicing");
});
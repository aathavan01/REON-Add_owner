var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongodb = require('mongodb');

var dbConn = mongodb.MongoClient.connect('mongodb://localhost:27017/REON');

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.resolve(__dirname, 'public')));

app.post('/post', function (req, res) {
    dbConn.then(function(db) {
        delete req.body._id; // for safety reasons
        db.collection('owners').insertOne(req.body);
    });    
    res.send('Successfully registed');
});

app.get('/view',  function(req, res) {
    dbConn.then(function(db) {
        db.collection('owners').find({}).toArray().then(function(owners) {
            res.status(200).json(owners);
        });
    });
});


app.listen(process.env.PORT || 8081, process.env.IP || '0.0.0.0' );

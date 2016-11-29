// MEAN Stack RESTful API Tutorial - Contact List App

var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('resume', ['resume']);
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get('/resume', function (req, res) {
  console.log('I received a GET request');

  db.resume.find(function (err, docs) {
    console.log(docs);
    res.json(docs);
    console.log("response sent");
  });
  
});

app.post('/addSchool', function(req, res){
  db.resume.insert(req.body, function(err,doc){
    res.json(doc);
  });
});

app.post('/resume', function (req, res) {
  console.log("request body"+req.body);
  db.resume.insert(req.body, function(err, doc) {
    res.json(doc);
  });
});

app.delete('/resume/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.resume.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.get('/resume/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.resume.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.put('/resume/:id', function (req, res) {
  var id = req.params.id;
  console.log(req.body.school);
  db.resume.findAndModify({
    query: {_id: mongojs.ObjectId(id)},
    update: {$set: {school: req.body.school, skill: req.body.skill, description: req.body.description}},
    new: true}, function (err, doc) {
      res.json(doc);
    }
  );
});

app.listen(8080);
console.log("Server running on default port 8080");
/*
http://erichonorez.wordpress.com/2013/02/10/how-create-a-rest-api-with-node-js-and-express/
https://gist.github.com/ixzo/4750663
*/

var express = require('express');
var app = express();
app.use(express.bodyParser());
app.use(express.static(__dirname + '/app'));

// mock data and persistence service
var users = [
    {'id': 1, 'name': 'Hugh',  'score': 3},
    {'id': 2, 'name': 'Bill',  'score': 4},
    {'id': 3, 'name': 'Steve', 'score': 5}
  ],
  count = users.length,
  generateId = function () {
    return ++count;
  },
  findById = function (id) {
    for (var i = 0; i < users.length; i++) {
      if (id == users[i].id) {
        return users[i];
      }
    }
  };

var log = function(req, res) {
  var d = new Date();
  console.log('[%d:%d:%d] %s %s', d.getHours(), d.getMinutes(),
    d.getSeconds(), req.method, req.url);
};


// REST apis = = = = = = = = = = = = =

// GET
app.get('/users', function(req, res) {
  log(req, res);
  res.json(users);
});

// GET by id
app.get('/users/:id', function(req, res) {
  log(req, res);
  var id = req.params.id,
      user = findById(id);
  if (user) {
    res.json(user);
  } else {
    res.send(404, {error: 'No user found'});
  }

});

// POST
app.post('/users', function(req, res) {
  log(req, res);
  var user = {
    id : generateId(),
    name : req.body.name,
    score : req.body.score
  };
  users.push(user);
  res.json(user);
});

// POST with :id ~> PUT
app.post('/users/:id', function(req, res) {
  log(req, res);
  // ~update
  var user = findById(req.params.id);
  if (user) {
    user.name = req.body.name;
    user.score = req.body.score;
    res.json(user);
  } else {
    res.send(404, {error: 'No user found'});
  }
});

// PUT
app.put('/users/:id', function(req, res) {
  log(req, res);
  var data = req.body;

  // update
  var user = findById(req.params.id);
  if (user) {
    user.name = data.name || user.name;
    user.score = data.score || user.score;
    res.json(user);
  } else {
    res.send(404, {error: 'No user found'});
  }

});

// DELETE
app.delete('/users/:id', function(req, res) {
  log(req, res);
  var id = req.params.id;

  if (id === 'ALL') {
    users = [];
    console.log('All users cleared');
    res.send(200,'');
  } else {
    for (var i = 0; i < users.length; i++) {
      if (id == users[i].id) {
        users.splice(i, 1);
        res.send(200,'');
        // must response '' otherwise 'OK' will be sent back and
        // backbone will trigger error for anything not empty
      }
    }
    res.send(404, {error: 'No user found'});
  }
});

// start server
app.listen(process.env.PORT || 8000);
console.log('Server running at http://127.0.0.1:8000');

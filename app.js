const express = require('express');
const app = express();
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');
const request = require('request');
const env = require('dotenv').config();
const pgp = require('pg-promise')();
const db = pgp('postgres://carolinamartes@localhost:5432/auth_p2')
// const db = pgp('postgres://lybtopytzzzqbf:wUHMkDGqj2-oTUith7hiqN5PM8@ec2-54-243-48-181.compute-1.amazonaws.com:5432/dam43ogo8qjd53') || pgp('postgres://carolinamartes@localhost:5432/auth_p2');
var port = Number(process.env.PORT || 3000)

app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use("/", express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());


app.post('/preferences', function(req, res) {
  var newPref = req.body;
  console.log(newPref)
  db.none(
      'INSERT INTO preferences (preference,type,name, yID, user_email) VALUES ($1,$2,$3,$4,$5)', [newPref.preference, newPref.type, newPref.name, newPref.yID, newPref.user_email])
    .catch(function() {
      res.send("Oops, couldn't save your stuff. Make sure you are logged in.")
      console.log("error")
      next();
    }).then(function(user) {
      res.send("Saved!")
      console.log("Submitted prefs!")
    });
});

app.delete('/preferences', function(req, res) {
  var deletePref = req.body;
  console.log(deletePref)
  db.none(
      'DELETE FROM preferences WHERE name=$1 AND user_email=$2', [deletePref.name, deletePref.user_email])
    .catch(function() {
      res.send("Sorry, couldn't delete.")
      console.log("error")
      next();
    }).then(function(user) {
      res.send("Deleted!")
      console.log("Deleted prefs!")
    });
});

app.get('favorites/all', function(req, res){
  res.render('favorites/all')
})



///put now
app.put('/preferences', function(req, res) {
  var updatePref = req.body;
  console.log(updatePref)
  db.none(
    'UPDATE preferences SET preference= $1 WHERE user_email=$2 AND name=$3', [updatePref.preference, updatePref.user_email, updatePref.name]
  ).catch(function() {
    res.send("Oops, couldn't update. Make sure you are signed in")
    console.log("error")
    next();
  }).then(function(user) {
    res.send("Saved!")
    console.log("updated prefs!")
  });
});


app.get('/preferences', function(req, res) {
  var getPref = req.body;

  console.log("user_email" + email)
  db.any(
    'SELECT DISTINCT ON (name,preference) name, yID, preference FROM preferences WHERE user_email=$1', [getPref.user_email]
  ).catch(function() {
    res.error = 'Error. Could not retrieve user prefs.';
    next();
  }).then(function(prefs) {

    var userData = {
        'email': user_email,
        'preferences': prefs,
      }
      // var location=location.pathname
    res.send(userData)


    console.log("Requested prefs!")
  });
});


app.get('/autocomplete/:input', function(req, res) {
  var input = req.params.input;
  var url = "http://www.omdbapi.com/?t=" + input + "&r=json";
  request(url, function(error, response, data) {
    if (!error && response.statusCode == 200) {
      var movie_data = JSON.parse(data);
      var title = movie_data.Title;
      console.log(title)
      res.send(title)
    }
  })
})


app.get('/search/:query/:Qtype/:counter/', function(req, res) {
  var query = req.params.query;
  var type = req.params.Qtype || "";
  var url = 'https://www.tastekid.com/api/similar?q=' + query + "&type=" + type + '&verbose=1&k=' + process.env.pass
  var videoCounter = req.params.counter;
  console.log(videoCounter)
  request(url, function(error, response, data) {
      var data = JSON.parse(data);
      var currentVideo = data.Similar.Results[videoCounter];
      console.log(currentVideo + "currentVideo")
    if (currentVideo==undefined){
      console.log('yay')
      console.log(currentVideo)
      error= {
        error:"Nothing here. Try searching something else."}
      res.render ('index', error);
  }
else{
      res.render('index', currentVideo);
}
  })
})

app.use(session({
  secret: 'demo-secret',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false
  }
}));

app.use(flash());

app.listen(port);

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
});

const router = require('./router')(app);

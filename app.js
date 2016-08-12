const express = require('express');
const app = express();
const mustacheExpress = require('mustache-express');
const bodyParser = require("body-parser");
const session = require('express-session');
const flash = require('connect-flash');
const request = require('request');
const env = require('dotenv').config();

app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use("/", express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
// app.use(countingVideos())
var type="";


app.get('/search/:query/:counter', function(req, res) {
  var query = req.params.query;
  var url = 'https://www.tastekid.com/api/similar?q=' + query + "&type=" + type+'&verbose=1&k=' + process.env.pass
  var videoCounter= req.params.counter;
  console.log(videoCounter)
  request(url, function(error, response, data) {
    if (!error && response.statusCode == 200) {
      var data = JSON.parse(data);
      var currentVideo = data.Similar.Results[videoCounter];
      res.render('index', currentVideo)
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

app.listen(3000, function() {
  console.log('Auth Demo App Online!');
});

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
});

const router = require('./router')(app);

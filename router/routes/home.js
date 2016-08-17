const express = require('express');
const urlgrey= require('urlgrey');
const router = express.Router();
const querystring = require('querystring');
const pgp = require('pg-promise')();
const db = pgp('postgres://carolinamartes@localhost:5432/auth_p2');

router.get('/', function (req, res){
  if(!req.session.user){
    res.redirect('sessions/new');
  } else {
    db.any(
      'SELECT DISTINCT ON (name,preference) name, yID, preference FROM preferences WHERE user_email=$1', [req.session.user.email]
    ).catch(function(){
      res.error = 'Error. Could not retrieve user prefs.';
      next();
    }).then(function(prefs){

console.log(prefs)


      var userData={
        'email' : req.session.user.email,
        'preferences' : prefs,
      }
      // console.log(userData.prefs.theNames)
        res.render('index', userData);
  });
}
  })



module.exports = router;

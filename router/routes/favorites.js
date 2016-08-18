const express = require('express');
const router = express.Router();
const pgp = require('pg-promise')();
// const db = pgp('postgres://carolinamartes@localhost:5432/auth_p2')
const db = pgp('postgres://lybtopytzzzqbf:wUHMkDGqj2-oTUith7hiqN5PM8@ec2-54-243-48-181.compute-1.amazonaws.com:5432/dam43ogo8qjd53') || pgp('postgres://carolinamartes@localhost:5432/auth_p2');

router.get('/all', function(req, res) {
  if (!req.session.user) {
    res.redirect('/sessions/new');
  } else {
    db.any(
      'SELECT DISTINCT ON (name,preference) name, yID, preference FROM preferences WHERE user_email=$1', [req.session.user.email]
    ).catch(function() {
      res.error = 'Error. Could not retrieve user prefs.';
      next();
    }).then(function(prefs) {
      var userData = {
        'email': req.session.user.email,
        'preferences': prefs,
      }
      res.render('favorites/all', userData);
    });
  }
})
module.exports = router;

const express = require('express');
const router = express.Router();
const querystring = require('querystring');
const pgp = require('pg-promise')();
const db = pgp('postgres://carolinamartes@localhost:5432/auth_p2')
// const db = pgp('postgres://lybtopytzzzqbf:wUHMkDGqj2-oTUith7hiqN5PM8@ec2-54-243-48-181.compute-1.amazonaws.com:5432/dam43ogo8qjd53') || pgp('postgres://carolinamartes@localhost:5432/auth_p2');

router.get('/', function(req, res) {
  if (!req.session.user) {
    res.redirect('sessions/new');
  } else {
      res.render('index', {'email': req.session.user.email });
    };
  })



module.exports = router;

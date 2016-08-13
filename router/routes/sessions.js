const express = require('express');
const router = express.Router();
const db = require('../../db/db');

router.get('/new', function(req, res){
  var error = req.flash('error')[0];
  res.render('sessions/new', { 'error': error });
});

router.post('/create', db.login, function(req, res){
  if(res.error) req.flash('error', res.error);
  console.log(req.session.user)
  res.redirect('/');
});


router.get('/guest',db.create_user, function(req, res){
  if(res.error) req.flash('error', res.error);
  req.session.user.email="Guest";
    res.render('index', {'email': 'Guest'});
      console.log(req.session.user);
});

router.get('/logout', db.logout, function(req, res){
  res.redirect('/');
});

module.exports = router;

const express = require('express');
const router = express.Router();
const db = require('../../db/db');

//
// router.post('/preferences/user', function(req, res){
//     var error = req.flash('error')[0];
//     console.log("yeay")
//   res.render('likes/user');
// });

  router.get('/prefs', function(req, res) {
   res.render('likes/prefs');
  //  res.redirect('likes/ldm')
  });
  module.exports = router;

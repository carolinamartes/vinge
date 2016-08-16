
const express = require('express');
const router = express.Router();
const db = require('../../db/db');

router.post('/user', db.get_prefs, function(req, res) {
  var user_email=req.body.user_email;
  var preferences=req.prefs
  console.log("req.prefs" + req.prefs)

  res.send(preferences)
  });
  module.exports = router;

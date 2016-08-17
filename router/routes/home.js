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


      // for (var i=0;i<prefs.length;i++){
      // var decodedName= decodeURIComponent(prefs[i].name)
      // prefs[i].name=decodedName
      //   // console.log("prefs[i].name " + prefs[i].name)
      // }

console.log(prefs)



// console.log(prefs.name)
// console.log(theNames)
// console.log(prefs)



// console.log(prefs)
//   var dataToSend = prefs;
// dataToSend.forEach(function(el){
// el.name="hi"
// })
// console.log("dataToSend" + JSON.parse(dataToSend))


  //foreach over dataToSend

  // set el.name = parsed(el.name)

  // data.name=theNames

// userData.preferences.name=theNames
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

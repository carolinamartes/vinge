'use strict';
$(document).ready(function() {

  $('select').material_select();
  $(".dropdown-button").dropdown();


$('.pref').on("click", function(){

var preference = $(this).attr('id');
var type= $(".mediaOptions").val() || "all";

var myString = window.location.pathname;
var myRegexp = /(search)\/(.*)\/(all|music|movies|shows)/
var match = myRegexp.exec(myString);
var matcharr = match[0].split('/');
// var email = $('#user_logo').text() || 'Guest';
var name = matcharr[1];

var newPref= {preference:preference,type:type,name:name}



$.ajax({
  "url": "/preferences",
  "method": "POST",
  "data": newPref,
  "success": function(data){
    console.log('ajax call was good.')
  },
  "error": function(){
    console.log("error")
  }
})
})

  $("input.autocomplete").on('keypress', function() {
    var input = $('input').val();

    $.ajax({
      "method": "get",
      "url": "/autocomplete/" + input,
      "success": function(data) {
        console.log(data)
        $('#suggestions').text(data)
      },
      "error": function() {
        console.log("error")
      }
    })
  })

  var query = query || "";
  var counter = counter || 0;
  var Qtype = Qtype || "";

  $('.searchBar').on('submit', function(e) {
    e.preventDefault();
    query = $('input').val();
    var Qtype = Qtype || "all";
    var counter = 0;
    window.location = "/search/" + query + "/" + Qtype + "/" + counter
  })

$('.autoText').on('click', function(e) {
  var query = $('h6').text();
  console.log(query)
  var Qtype = Qtype || "all";
  var counter = 0;
  window.location = "/search/" + query + "/" + Qtype + "/" + counter
})


  $("body").keydown(function(e) {
    if (e.keyCode == 39) {

      var myString = window.location.pathname;
      var myRegexp = /\/search\/(.*)\/\d/;
      var match = myRegexp.exec(myString);
      var query = match[1]

      counter = window.location.pathname.replace(/(...+\/)/, '');
      counter++

      window.location = "/search/" + query + "/" + Qtype + counter
    }
  });

  $(".mediaOptions").on("click", function() {

    var myString = window.location.pathname;
    var myRegexp = /(search)\/(.*)\/(all|music|movies|shows)/
    var match = myRegexp.exec(myString);
    var matcharr = match[0].split('/');
    query = matcharr[1]
    Qtype = matcharr[2]

    var Qtype = $(this).attr('id');
    window.location = "/search/" + query + "/" + Qtype + "/" + counter

  })

});

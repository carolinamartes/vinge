'use strict';
$(document).ready(function() {

$('select').material_select();
$(".dropdown-button").dropdown();

var counter=0;
var query="";

$('.searchBar').on('submit', function (e){
e.preventDefault();
query= $('input').val();

window.location="/search/"+query+"/"+counter
})


$("body").keydown(function (e) {
  if(e.keyCode == 39) {

var myString = window.location.pathname;
var myRegexp = /\/search\/(.*)\/movies/;
var match = myRegexp.exec(myString);
var query=match[1]

counter= window.location.pathname.replace(/(...+\/)/, '');
counter++

window.location="/search/"+query+"/"+counter
}

  });



$(".mediaOptions").on("click", function(){

  var myString = window.location.pathname;
  var myRegexp = /\/search\/(.*)\/movies/;
  var match = myRegexp.exec(myString);
  var query=match[1]

    var myString = window.location.pathname;
    var myRegexp = /search\/(.*)\/music|movies|shows/;
    var match = myRegexp.exec(myString);
    var Qtype=match[0]

  var Qtype=$(this).attr('id');
  window.location="/search/"+query+"/"+Qtype+"/"+counter

  })


 });

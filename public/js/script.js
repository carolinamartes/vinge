'use strict';
$(document).ready(function() {

$('select').material_select();
$(".dropdown-button").dropdown();

var counter=0;
var query="";

$('.searchBar').on('submit', function (e){
e.preventDefault();
query= $('input').val();

  window.location="/search/"+query+"/all/"+counter
})


$("body").keydown(function (e) {
  if(e.keyCode == 39) {

    var myString = window.location.pathname;
    var myRegexp = /\/search\/(.*)\/\d/;
    var match = myRegexp.exec(myString);
    var query=match[1]

counter= window.location.pathname.replace(/(...+\/)/, '');
counter++

  window.location="/search/"+query+"/all/"+counter
}

  });


$(".mediaOptions").on("click", function(){
//get correct regexs

var myString = window.location.pathname;
var myRegexp = /(search)\/(.*)\/(all|music|movies|shows)/
var match = myRegexp.exec(myString);
var matcharr=match[0].split('/');
query= matcharr[1]
Qtype= matcharr[2]


  var Qtype=$(this).attr('id');
  window.location="/search/"+query+"/"+Qtype+"/"+counter

  })


 });

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

query = window.location.pathname.replace('/search/','')
query = query.replace(/\/[^\/]*$/,'')


counter= window.location.pathname.replace(/(...+\/)/, '');
counter++

window.location="/search/"+query+"/"+counter
}

$("#dropdownMovies").on("click", function(){
type=$(this).val()
window.location="/search/"+query+"/"+counter
})




  });


 });

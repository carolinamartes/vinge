$(function(){

var user_email= sessionStorage.getItem('user_email');
console.log(user_email)
  $.ajax({
    "url": "/preferences/user",
    "method": "POST",
    "data": {
      "user_email": user_email
    },
    "success": function(data){

    console.log("yay", data)
    },
    "error": function(){
      console.log("error")
    }
})


// for (var i=0;i<preferences.length;i++){
//   $('<a class="carousel-item"></a>').attr("src", "http://img.youtube.com/vi/"+ {{yID}}+"/0.jpg").appendTo($('div.carousel carousel-slider'))
// }







})

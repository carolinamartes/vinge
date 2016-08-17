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

      for (var i=0;i<data.length;i++){
      if (data[i].yid!==""){
      var src= "http://img.youtube.com/vi/"+ data[i].yid + "/2.jpg";
      document.write('<img class="carousel-item" src="' + src + '"></i>')
      $('img').appendTo($("<div class= 'carousel-slider'>").appendTo($('body')))
      }
      else{
        $("<a class='carousel-item'>").text(name).appendTo($("<div class= 'carousel-slider'>"))
      }
      // $("<a class='carousel carousel-slider'>").append($('img')).appendTo($('.carousel-slider'))
}
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

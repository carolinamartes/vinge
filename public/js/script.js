'use strict';
$(document).ready(function() {


  $('select').material_select();
  $(".dropdown-button").dropdown();

  var user_email = $('#user_logo').text();

  if (user_email !== "") {
    sessionStorage.setItem('user_email', $('#user_logo').text())
  }

  if (user_email === "") {
    user_email = sessionStorage.getItem('user_email');
    $('#user_logo').text(user_email);
  }

  $('#user_logo').on('click', function() {




    $.ajax({
      type: 'GET',
      url: '/preferences',
      success: function() {
        //  location.reload();
        console.log("got it!")
        $("big-container").css({
          "overflow": "visible"
        });


      }
    })



  })




  $('.pref').on("click", function() {

    var preference = $(this).attr('id');
    var type = $(".mediaOptions").val() || "all";
    var yID = $('.hiddenID').text()
    var myString = window.location.pathname;
    var myRegexp = /(search)\/(.*)\/(all|music|movies|shows)/
    var match = myRegexp.exec(myString);
    var matcharr = match[0].split('/');
    var name = matcharr[1];
    name = decodeURIComponent(name)

    var newPref = {
      preference: preference,
      type: type,
      name: name,
      yID: yID,
      user_email: user_email
    }

    $.ajax({
      "url": "/preferences",
      "method": "POST",
      "data": newPref,
      "success": function(data) {
        console.log(data)
        Materialize.toast(data, 3000)
      },
      "error": function() {
        console.log("error")
      }
    })
  })

  $("#autocomplete-input").on('keypress', function() {
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
    var query = $(this).text();
    console.log(query)
    var Qtype = Qtype || "all";
    var counter = 0;
    window.location = "/search/" + query + "/" + Qtype + "/" + counter
  })

  function getNext() {
    var myString = window.location.pathname;
    var myRegexp = /\/search\/(.*)\/\d/;
    var match = myRegexp.exec(myString);
    var query = match[1]

    counter = window.location.pathname.replace(/(...+\/)/, '');
    counter++

    window.location = "/search/" + query + "/" + Qtype + counter
  }

  $("body").keydown(function(e) {
    if (e.keyCode == 39) {
      getNext()
    }
  });
  $('.btn-floating').on('click', function() {
    getNext()
  })

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

  $('.updt').on('click', function() {
    var preference = $(this).val();
    var name = $(this).attr('id');
    if ($(this).val() !== 'delete') {
      var updatePref = {
        preference: preference,
        name: name,
        user_email: user_email
      }
      $.ajax({
        type: 'PUT',
        url: '/preferences',
        data: updatePref,
        success: function() {
          console.log("updated!")
           location.reload();
        }
      });
    } else {
      var deletePref = {
        preference: preference,
        name: name,
        user_email: user_email
      }
      $.ajax({
        type: 'DELETE',
        url: '/preferences',
        data: deletePref,
        success: function() {
          console.log("deleted!")
             location.reload();
        }
      });

      var getPref = {
        user_email: user_email,

      }
    $.ajax({
      type: 'GET',
      url: '/refresh',
      data: getPref,
      success: function(userData) {
        location.reload();
        console.log("got it!")
        console.log("userData")
      }
    })

    $("big-container").css({
      "overflow": "visible"
    });
  }

  })




});

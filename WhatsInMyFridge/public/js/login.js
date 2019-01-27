function displayLogin() {
  $("#app-signup").fadeOut(200);
  $("#app-login").fadeIn(1000);
}

function displaySignup() {
  // $("#app-login").fadeOut(200);
  // $("#app-signup").fadeIn(1000);
  $.get("/signup", function (res) {

  });
}

$(document).ready(function () {
  displayLogin();

  Splitting({
    by: 'chars',
    whitespace: true
  });

  // Dropdown menu
  $(".dropdown-button").dropdown();

  // Navbar for mobile
  $(".button-collapse").sideNav({
    "closeOnClick": true
  });
});
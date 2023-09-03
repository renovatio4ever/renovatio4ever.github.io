//find recipes
//recipe app_id ='9550365e'
//recipe app_key ='62b808ba14bc95262bab3c0876be2412'
//wine akey ='5pgy0fabib7s89ky9l5fx24ha754svspwnata652tn7gdr71'

//psuedo-code

function findrecipe() {

  var winetype;
  var wineresults;
  var ingredient = $(this).attr("recipe-name");
  var recipeURL = "https://api.edamam.com/search?q=" + ingredient + "&app_id=" + APP_ID + "&app_key" + APPKEY;
  var wineURL = "//api.snooth.com/wines/?q=" + winetype + "&akey=" + A_KEY + "&s=ser"
  var useringredients = str.split(" ");

  // edaman results

  var eda_recipeurl[]
  var snooth_wineurl[]

  // for every ingredient, find a recipe and wine
  // where there is no match for wine "no pairing could be found"
  // pairing is 1:1

  for (var i = 0; i < useringredients.length; i++) { // max 3

      $.ajax({
          url: recipeURL,
          method: "GET"
      }).done(function (response) {
          var reciperesults = response.data;

          for (var i = 0; i < reciperesults.length; i++) {
              push eda_recipeurl("url");

              // compare to pairing table
              // if reciperesult = food_type from pairing tbl
              // then return winetype (wine_type).. to be used in subsequey ajax call
              // if none then "there is no matching wine"

              $.ajax({
                  url: wineURL,
                  method: "GET"
              }).done(function (response) {
                  wineresults = response.data;

                  for (var i = 0; i < wineresults.length; i++) {

                      push snooth_wineurl("wineurl");

                  };
              };
          }

  
};



// function to deconstruct recipe and wine uri by user
// SELECT tbl_users.ID, tbl_users.first_name, tbl_users.last_name, tbl_recipes.recipe_uri, tbl_recipes.wine_uri
// FROM tbl_users INNER JOIN tbl_recipes ON tbl_users.ID = tbl_recipes.userid;

//recipes

// var eda_recipe_title []
// var eda_image []
// var recipe_link []

//wines

// var snooth_title []
// var snooth_img []
// var wine_link []

// for (var i = 0; i < dbrecipeextract.length; i++)
// build each card
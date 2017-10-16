var app = angular.module('app', ['autocomplete']);

// the service that retrieves some movie title from an url
app.factory('MovieRetriever', function($http, $q, $timeout){
  var MovieRetriever = new Object();

  MovieRetriever.getmovies = function(i) {
    var moviedata = $q.defer();
    var movies;

    var moreMovies = [{name:"The Wolverine"}, {name:"The Smurfs 2"},{name: "The Mortal Instruments: City of Bones"}, {name:"Drinking Buddies"}, {name: "The Act Of Killing"},  {name:"Getaway"}, {name:"Red Obsession"},  {name:"The World's End"}, {name:"Planes"}, {name: "Man of Steel"}, {name: "Before Midnight"}, {name:"Only God Forgives"},{name: "I Give It a Year"},{name:"The Heat"},{name:"Kevin Hart: Let Me Explain"}, {name: "Maniac"}, {name: "Europa Report"}, {name:"Stuck in Love"},{name:"Frances Ha"},{name: "Lovelace"}, {name:"R.I.P.D."}]

    if(i && i.indexOf('T')!=-1)
      movies=moreMovies;
    else
      movies=moreMovies;

    $timeout(function(){
      moviedata.resolve(movies);
    },1000);

    return moviedata.promise
  }

  return MovieRetriever;
});

app.controller('MyCtrl', function($scope, MovieRetriever){

  $scope.movies = MovieRetriever.getmovies("...");
  $scope.movies.then(function(data){
    $scope.movies = data;
  });

  $scope.getmovies = function(){
    return $scope.movies;
  }

  $scope.doSomething = function(typedthings){
    console.log("Do something like reload data with this: " + typedthings );
    $scope.newmovies = MovieRetriever.getmovies(typedthings);
    $scope.newmovies.then(function(data){
      $scope.movies = data;
    });
  }

  $scope.doSomethingElse = function(suggestion){
    console.log("Suggestion selected: "  );
    console.log( suggestion);
  }

});

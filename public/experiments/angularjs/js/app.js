/**
 * Created by abhinavmaurya on 2/10/16.
 */

(function(){

    angular
        .module("MovieDBApp", [])
        .controller("MovieListController", MovieListController);


    function MovieListController($scope){

        console.log("Hello from angular controller");
        var movies = [
            {"id":123, "title": "Avatar", "year": 2007},
            {"id":234, "title": "Star Wars", "year": 1977},

        ];

        // event handlers declarations
        $scope.movies = movies;
        $scope.addMovie = addMovie;
        $scope.deleteMovie = deleteMovie;
        $scope.selectMovie = selectMovie;
        $scope.updateMovie = updateMovie;


        // Event handler implementations
        function addMovie(movie){

            //console.log("Add movie");
            //$scope.title
            var newMovie = {
                id: movie.id,
                title: movie.title,
                year: movie.year
            };
            $scope.movie = {};
            $scope.movies.push(newMovie);

        }

        function deleteMovie(movie){
            var index = $scope.movies.indexOf(movie);

            $scope.movies.splice(index, 1);
        }
        var selectedMovieIndex = null;
        function selectMovie(movie){
            selectedMovieIndex = $scope.movies.indexOf(movie);
            $scope.movie = {
                id: movie.id,
                title: movie.title,
                year: movie.year
            };
        }


        function updateMovie(movie){
            $scope.movies[selectedMovieIndex] = {
                id: movie.id,
                title: movie.title,
                year: movie.year
            };
        }


    }
})();

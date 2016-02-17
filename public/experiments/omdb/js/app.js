/**
 * Created by abhinavmaurya on 2/5/16.
 */
(function(){
    $(init);
    var $movieTitleTxt;
    var $searchBtn;
    var SEARCH_URL = "http://www.omdbapi.com/?s=TITLE";
    var DETAILS_URL = "http://www.omdbapi.com/?i=IMDBID";

    var $searchResults;

    var $title;
    var $actors;
    var $director;
    var $plot;
    var $poster;



    function init(){
        $movieTitleTxt=$("#movieTitleTxt");
        $searchBtn = $("#searchBtn");
        $searchResults = $("#searchResults tbody");

        // Action
        $searchBtn.click(searchMovie);

        $title = $("#title");
        $actors = $("#actors");
        $director = $("#director");
        $plot = $("#plot");
        $poster = $("#poster");
    }

    function searchMovie(event){
        var title = $movieTitleTxt.val();
        //alert("Search for title: " + title);
        var url = SEARCH_URL.replace("TITLE", title);
        //alert("URL= "+url);

        $.ajax({
            url: url,
            success: renderSearchResults
        });
    }

    function renderSearchResults(response){

        //console.log(response);

        var totalResults = response.totalResults;
        var movies = response.Search;
        //console.log(movies);

        $searchResults.empty();
        for(var m=0; m<movies.length; m++){
            //console.log(movies[m]);
            var movie = movies[m];
            var posterURL = movie.Poster;
            var title = movie.Title;
            var year = movie.Year;
            var imdbID = movie.imdbID;

            var $tr = $("<tr>")
                .attr("id", imdbID)
                .click(fetchMovieDetails);


            var $img = $("<img>")
                .attr("src", posterURL)
                .addClass("posterThumb");

            var $td = $("<td>")
                .append($img)
                .appendTo($tr);

            var $td = $("<td>")
                .append(title)
                .appendTo($tr);

            var $td = $("<td>")
                .append(year)
                .appendTo($tr);

            var $td = $("<td>")
                .append(imdbID)
                .appendTo($tr);

            $searchResults.append($tr);
            //console.log($tr);
        }
    }

    function fetchMovieDetails(event){
        //console.log(event);
        var $tr = $(event.currentTarget);
        var imdbID = $tr.attr("id");

        var url = DETAILS_URL.replace("IMDBID", imdbID);

        $.ajax({
            url: url,
            success: renderMovieDetails
        });
    }

    function renderMovieDetails(response){
        console.log(response);
        var actors = response.Actors;
        var title = response.Title;
        var director = response.Director;
        var plot = response.Plot;
        var poster = response.Poster;

        $title.html(title);
        $plot.html(plot);
        $poster.attr("src", poster);
        $director.html(director);

        $actors.empty();
        var actorArray = actors.split(",");
        for(var a in actorArray){
            var actor = actorArray[a];
            $li = $("<li>").append(actor).appendTo($actors);
        }
    }
})();

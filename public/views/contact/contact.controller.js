/**
 * Created by abhinavmaurya on 3/22/16.
 */

(function() {

    angular
        .module("PortfolioApp")
        .controller("MapController", MapController);


    function MapController($scope){

        $scope.lat = 42.3428858;
        $scope.lng = -71.1030752;
        var mapOptions = {
            zoom: 16,
            center: new google.maps.LatLng($scope.lat, $scope.lng),
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        $scope.map = new google.maps.Map(document.getElementById('mapCanvas'), mapOptions);

        var marker = new google.maps.Marker({
            map: $scope.map,
            position: new google.maps.LatLng($scope.lat, $scope.lng),
            title: "Boston"
        });
    }

})();

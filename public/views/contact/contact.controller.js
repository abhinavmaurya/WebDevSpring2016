/**
 * Created by abhinavmaurya on 3/22/16.
 */

(function() {

    angular
        .module("PortfolioApp")
        .controller("ContactController", ContactController)
        .controller("MapController", MapController);


    function ContactController(){

        var vm = this;

        function init(){

        }
        init();
    }


    function MapController(){

        var vm = this;

        function init(){
            vm.lat = 42.3428858;
            vm.lng = -71.1030752;
            var mapOptions = {
                zoom: 16,
                center: new google.maps.LatLng(vm.lat, vm.lng),
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            vm.map = new google.maps.Map(document.getElementById('mapCanvas'), mapOptions);
            var marker = new google.maps.Marker({
                map: vm.map,
                position: new google.maps.LatLng(vm.lat, vm.lng),
                title: "Boston"
            });
        }
        init();
    }

})();

/**
 * Created by abhinavmaurya on 3/18/16.
 */

"use strict";

(function(){
    angular
        .module("amDirectives", [])
        .directive("amSortable", amSortable);

    function amSortable() {
        function link(scope, element, attrs) {
            var start = null;
            var end   = null;
            $(element)
                .sortable({
                    axis: "y",
                    sort: function(event, ui) {
                        //ui.helper.find("a").hide();
                        start = ui.item.index();
                    },
                    stop: function(event, ui) {
                        //ui.item.find("a").show();
                        end = ui.item.index();
                        if(start >= end) {
                            start--;
                        }
                        scope.model.sortFields(start, end);
                    }
                });
        }
        return {
            link: link
        };
    }
})();
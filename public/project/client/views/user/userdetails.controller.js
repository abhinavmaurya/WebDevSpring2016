/**
 * Created by abhinavmaurya on 2/19/16.
 */
"use strict";
(function (){

    angular
        .module("TradeBullApp")
        .controller("UserDetailsController", UserDetailsController);

    function UserDetailsController(UserService, SweetAlert, $routeParams, UserStockService, StockService){

        var vm = this;
        vm.error = null;
        vm.userId = $routeParams.userId;
        vm.viewingUser = UserService.getCurrentUser();

        // event handlers declaration
        vm.follow = follow;
        vm.unfollow = unfollow;


        function init(){
            fetchUserDetails(vm.userId);
            vm.isFollowing = isExist(vm.userId, vm.viewingUser.following);
        }
        init();

        function fetchUserDetails(userId){
            UserService
                .findUserById(userId)
                .then(
                    function(response){
                        if(response.data){
                            vm.user = response.data;
                            return UserStockService.getUserWatchlist(userId);
                        }else{
                            vm.error("User does not exist");
                        }

                    },
                    function(err){
                        vm.error("Error fetching data of user");
                        console.log(err);
                    }
                )
                .then(
                    function(response){
                        vm.user.watchlist = response.data;
                        return UserStockService.getUserPortfolio(userId);
                    },
                    function (err){
                        console.log(err);
                    }
                )
                .then(
                    function(response){
                        vm.user.portfolio = response.data;
                        fetchUserStockDetails();
                    },
                    function(err){
                        console.log(err);
                    }
                )
        }

        function fetchUserStockDetails(){
            // fetch watchlist stocks
            var watchlist = vm.user.watchlist;
            vm.user.watchlist = [];
            for(var s in watchlist){
                StockService
                    .findStockById(watchlist[s])
                    .then(function(response){
                        var stock = {stockId: response.data.Symbol, Name: response.data.Name};
                        vm.user.watchlist.push(stock);
                    });
            }

            var portfolio = vm.user.portfolio;
            vm.user.portfolio = [];
            for(var s in portfolio){
                StockService
                    .findStockById(portfolio[s].stockId)
                    .then(function(response){
                        var stock = {stockId: response.data.Symbol, Name: response.data.Name};
                        console.log(stock);
                        vm.user.portfolio.push(stock);
                    });
            }
        }

        function isExist(element, lst){
            var flag = false;
            for(var s in lst){
                if(lst[s].userId == element){
                    flag=true;
                    break;
                }
            }
            return flag;
        }

        function follow(){
            UserService
                .addFollowingUser(vm.viewingUser._id, {userId: vm.user._id, username: vm.user.username})
                .then(
                    function(response){
                        return UserService.addFollower(vm.userId, {userId: vm.viewingUser._id, username: vm.viewingUser.username});
                    },
                    function (err){
                        console.log(err);
                    }
                )
                .then(
                    function(response){
                        vm.isFollowing = true;
                        SweetAlert.swal("Following!", "You are following "+ vm.user.username, "success");
                    },
                    function (err){
                        console.log(err);
                    }
                )
        }

        function unfollow(){
            UserService
                .deleteFollowingUser(vm.viewingUser._id, vm.userId)
                .then(
                    function(response){
                        return UserService.deleteFollower(vm.userId, vm.viewingUser._id);
                    },
                    function (err){
                        console.log(err);
                    }
                )
                .then(
                    function(response){
                        vm.isFollowing = false;
                        SweetAlert.swal("UnFollowed!", "You are not following "+ vm.user.username+ " anymore!", "error");
                    },
                    function (err){
                        console.log(err);
                    }
                )
        }
    }


})();

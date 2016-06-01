/**
 * Created with JetBrains WebStorm.
 * User: Gerd
 * Date: 06.03.14
 * Time: 21:51
 * To change this template use File | Settings | File Templates.
 */

(function() {

    angular
    .module("App")
    .controller("appController", appController);

    appController.$inject = ["$scope", "$resource", "$window", "UserAuthFactory", "AuthenticationFactory"]    

    function appController($scope, $resource, $window, UserAuthFactory, AuthenticationFactory) {
        $scope.TeamDevMembers = $window.exports.AllTeams;
        $scope.common = {};

        $scope.log = function (value) {
            $window.console.log(value);
        };

        $scope.isExist = function (item) {
            return angular.isDefined(item);
        };

        $scope.isString = function (item) {
            return _.isString(item);
        };

        $scope.isInt = function (n) {
            return typeof n === 'number' && parseFloat(n) == parseInt(n, 10) && !isNaN(n);
        };


        $scope.statuses = $window.exports.Statuses;
        $scope.STATUS = $window.exports.STATUS;
        $scope.RESOLUTION = $window.exports.RESOLUTION;
        $scope.VERSION = $window.exports.VERSION;

        $scope.logout = function(){
            UserAuthFactory.logout();
        };

        $scope.isAdmin = function() {
            if(AuthenticationFactory.isLogged) {
                return AuthenticationFactory.user.groups.indexOf("Administrators") !== -1;
            }

            return false;
        }

        $scope.allVersions = [{id: "All", name: "All"}];
        
        $scope.loggedInUser = AuthenticationFactory.user;

        $scope.$on("loggedin", function(){
            $scope.loggedInUser = AuthenticationFactory.user;
        });
    }
})();
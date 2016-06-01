(function(){
  angular
    .module("App")
    .controller("LoginCtrl", LoginController);

    LoginController.$inject = ['$scope', '$window', '$location', 'UserAuthFactory', 'AuthenticationFactory'];

    function LoginController($scope, $window, $location, UserAuthFactory, AuthenticationFactory) {
     
      $scope.login = function(user) {
        
        var username, password;

        if(angular.isDefined(user)) {
            username = user.username ? user.username.trim(): undefined;
            password = user.password ? user.password.trim(): undefined;
        }
   
        if (username !== undefined && password !== undefined && username != "" && password != "") {
          UserAuthFactory.login(username, password).success(function(data) {
         
            AuthenticationFactory.isLogged = true;
            AuthenticationFactory.user = data.user;
            //AuthenticationFactory.userRole = data.user.role;
   
            $window.sessionStorage.token = data.token;
            $window.sessionStorage.user = JSON.stringify(data.user);
            //$window.sessionStorage.user = data.user.username; // to fetch the user details on refresh
            //$window.sessionStorage.userRole = data.user.role; // to fetch the user details on refresh
            
            $scope.$emit("loggedin");

            $location.path("/");
   
          }).error(function(error) {
            $scope.error = error;
          });
        } else {
          $scope.error = "Please enter username and password.";
        }
      };
  }  
})();
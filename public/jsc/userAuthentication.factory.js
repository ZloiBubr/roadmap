(function(){
  angular
    .module("App")
    .factory('UserAuthFactory', UserAuthFactory);

    UserAuthFactory.$inject = ["$window", "$location", "$http", "AuthenticationFactory"];

     function UserAuthFactory($window, $location, $http, AuthenticationFactory) {
      return {
        login: function(username, password) {
          return $http.post('http://localhost:3000/login', {
            username: username,
            password: password
          });
        },
        logout: function() {
     
          if (AuthenticationFactory.isLogged) {
     
            AuthenticationFactory.isLogged = false;
            delete AuthenticationFactory.user;
            //delete AuthenticationFactory.userRole;
     
            delete $window.sessionStorage.token;
            delete $window.sessionStorage.user;
            //delete $window.sessionStorage.userRole;
     
            $location.path("/login");
          } 
        }
      }
  }  
})();


angular.module("App").factory('AuthenticationFactory', function($window) {
  var auth = {
    isLogged: false,
    check: function() {
      if ($window.sessionStorage.token && $window.sessionStorage.user) {
        this.isLogged = true;
        this.user = JSON.parse($window.sessionStorage.user);
      } else {
        this.isLogged = false;
        delete this.user;
      }
    }
  }
 
  return auth;
});
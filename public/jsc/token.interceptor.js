(function(){
  angular
    .module("App")
    .factory('TokenInterceptor', function($q, $window) {
      return {
        request: function(config) {
          config.headers = config.headers || {};
          if ($window.sessionStorage.token) {
            config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
          }
          return config || $q.when(config);
        },
     
        response: function(response) {
          if (response.status === 401) {
            // handle the case where the user is not authenticated
          }
          return response || $q.when(response);
        }
      };
  });

  angular
    .module("App")
    .config(function ($httpProvider) {
      $httpProvider.interceptors.push('TokenInterceptor');
  });  
})();


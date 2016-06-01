(function(){
	angular
		.module("App")
		.factory("userRegistrationService", userRegistrationService);

	userRegistrationService.$inject = ["$http"];

	function userRegistrationService($http) {

		return {
	        register: function(username, password) {
	          return $http.post('http://localhost:3000/register', {
	            username: username,
	            password: password
	          });
	        }
	    };
	}
})();
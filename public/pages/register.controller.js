(function() {
	angular.module("App").controller("RegisterCtrl", function($scope, $location, userRegistrationService){

		this.register = register;

		function register(user) {

			var username, password;

			if(user && user.username && user.password && user.username && user.username.trim().length > 0 && user.password.trim().length > 0) {
				
				username = user.username.trim();

				password = user.password.trim();
			}

			if(username !== undefined && password != undefined) {
				$scope.error = false;

				userRegistrationService.register(username, password).success(function(){
					$location.path("/login");	
				})
				.error(function(error) {
					$scope.error = error;
				});
			}
			else {
				$scope.error = "Please enter user name and password";
			}
		}

	});
}());
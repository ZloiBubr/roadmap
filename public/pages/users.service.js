(function(){
	angular
		.module("App")
		.factory("usersService", usersService);

	usersService.$inject = ["$resource"];

	function usersService($resource) {

		return $resource("/api/users/:userId", {userId: "@_id"});

	}		
})();
(function(){
	angular
		.module("App")
		.controller("UsersController", UsersController);

	UsersController.$inject = ["$scope","usersService"];
		
	function UsersController($scope, usersService) {
		
		var vm = this;

		this.users = [];

		usersService.query({}, function(data){
			vm.users = data;
		});

		//this.users = [{username: "admin", active: true}, {username: "alex", active: true}, {username: "bob", active: false}];
		
		this.selectedUser = null;
		
		this.selectUser = function(user) {
			this.selectUser = user;
		}

		this.save = function() {
			this.users.forEach(function(user){
				user.$save();
			});	
		}	
	}
})();
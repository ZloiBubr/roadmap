(function(){
	angular
		.module("App")
		.controller("AdminController", AdminController);

		function AdminController () {
			this.groups = ["Manage Users", "Update from JIRA"];
			this.selectedGroup = this.groups[0];
			this.selectedViewUrl = function() {
				switch(this.selectedGroup) {
					case "Manage Users":
						return "/pages/users.html";
					case "Update from JIRA":
						return "pages/updateFromJira.html";
				}
			};
			this.selectGroup = function(group) {
				this.selectedGroup = group;
			}
		}
})();
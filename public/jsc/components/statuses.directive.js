(function(){
	angular
		.module("App")
		.directive("rptStatuses", rptStatuses);

	 function rptStatuses(){
		var rptStatuses = {
			restrict: "E",
			replace: true,
			scope: {
				data:"=",
				config: "=",
				select: "&"
			},
			templateUrl: "/jsc/components/statuses.directive.html",
			link: link
		};

		return rptStatuses;

		function link(scope, elem, attrs) {
				
			initTotal();

			scope.selectTotal = function(value) {
				angular.forEach(scope.config, function(status){
					status.isChecked = value;
				});

				scope.select();
			}

			scope.selectStatus = function(){
				initTotal();
				scope.select();
			}

			function initTotal() {

				scope.total = {
					isChecked: true
				};

				for(var i = 0; i < scope.config.length; i++) {
					if(!scope.config[i].isChecked) {
						scope.total.isChecked = false;
						break;
					}
				}

			}
		}	
	}
})();
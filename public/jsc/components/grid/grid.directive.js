(function() {
	angular
		.module("App")
		.directive("rptGrid", rptGrid);

	rptGrid.$inject = ["gridCacheService"];

	function rptGrid (gridCacheService) {
		var rptGrid = {
			restrict: "E",
			replace: true,
			templateUrl: "/jsc/components/grid/grid.directive.html",
			link: link,
			scope: {
				gridModel: "=data",
				grid: "=config"				
			}
		};

		function link(scope) {

			scope.$watch("gridModel", function(){
				scope.renderedGroups = [];
				gridCacheService.init(scope.gridModel.groups);
				gridCacheService.loadNext(scope.renderedGroups);
			});

			scope.loadData = function() {
				gridCacheService.loadNext(scope.renderedGroups);				
			}
		}

		return rptGrid;
	}

})();
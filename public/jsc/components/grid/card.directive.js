(function() {
	angular
		.module("App")
		.directive("rptCard", rptCard);

    rptCard.$inject = ["filterService", "expressionEvaluator"];		

	function rptCard (filterService, expressionEvaluator) {
		var rptCard = {
			restrict: "E",
			templateUrl: "/jsc/components/grid/card.directive.html",
			replace: true
		};

		return rptCard;
	}
})();
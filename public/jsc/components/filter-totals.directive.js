(function(){
	angular
		.module("App")
		.directive("rptFilterTotals", rptFilterTotals);

	rptFilterTotals.$inject = ["expressionEvaluator"];

	function rptFilterTotals (expressionEvaluator){

		var rptFilterTotals = {
			restrict: "E",
			replace: true,
			templateUrl: "/jsc/components/filter-totals.directive.html",
			scope: {
				config: "=",
				data: "="
			},
			link: link
		};

		return rptFilterTotals;

		function link(scope, elem, attrs) {
			scope.evalExpression = function (expression) {
				return expressionEvaluator.eval(scope.data, expression);
			}
		}
	}
})();
(function() {
	angular
		.module("App")
		.directive("rptSummary", rptSummary);

	rptSummary.$inject = ["expressionEvaluator"];

	function rptSummary(expressionEvaluator) {
		var rptSummary = {
			restrict: "E",
			scope: {
				data: "=",
				config: "="
			},
			replace: true,
			templateUrl: "/jsc/components/summary.directive.html",
			link: link
		};

		return rptSummary;

		function link(scope, elem, attrs) {
			scope.evalExpression = function(expression) {
				return expressionEvaluator.eval(scope.data, expression);
			}
		}
	}
})();
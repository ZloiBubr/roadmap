(function(){
	angular
		.module("App")
		.directive("rptIcons", rptIcons);

	rptIcons.$inject = ["expressionEvaluator"];

	function rptIcons(expressionEvaluator){
		var rptIcons = {
			restrict: "E",
			templateUrl: "/jsc/components/icons.directive.html",
			scope: {
				config: "=",
				data: "="
			},
			replace: true,
			link: link
		};

		return rptIcons;

		function link (scope, elem, attrs) {
			scope.evalExpression = function(expression) {
				
				return expressionEvaluator.eval(scope.data, expression);
			}
		}
	}
})();
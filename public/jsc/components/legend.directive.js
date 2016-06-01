(function(){
	angular
		.module("App")
		.directive("rptLegend", rptLegend);

	function rptLegend(){
		var rptLegend =  {
			restrict: "E",
			replace: true,
			scope: {
				config:"="
			},
			templateUrl:"/jsc/components/legend.directive.html"
		}
		return rptLegend;
	}
})();
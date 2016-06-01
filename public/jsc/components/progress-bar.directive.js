(function(){
	angular
		.module("App")
		.directive("rptProgressBar", rptProgressBar);

	function rptProgressBar() {
		var rptProgressBar = {
			restrict: "E",
			templateUrl: "/jsc/components/progress-bar.directive.html",
			scope: {
				value: "@value",
				title: "@title",
				type: "@type"
			},
			replace: true
		};

		return rptProgressBar;
	}
})();
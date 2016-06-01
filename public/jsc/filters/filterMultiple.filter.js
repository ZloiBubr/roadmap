(function() {
	angular.module("App").filter("filterMultiple", function(filterService){
		return function(items, criteria) {
			
			if(angular.isUndefined(criteria)) {
				return items;
			}
			else if(criteria === null) {
				return [];
			}
			else {
				var result = [];
				
				angular.forEach(items, function (item) {
					if(filterService.match(item, criteria)) {
						result.push(item);
					}
				});

				return result;
			}
		}
	})
})();
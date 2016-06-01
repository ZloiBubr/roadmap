(function(){
	angular.module("App")
	.filter("status", function(){
		return function (items, statuses) {
			var resultArr = [];
			angular.forEach(items, function(item) {
				if(statuses.indexOf(item.status) != -1) {
					resultArr.push(item);
				}
			});
			return resultArr;	
		}
	});
})();
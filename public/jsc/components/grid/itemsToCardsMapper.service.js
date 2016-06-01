(function(){
	angular
		.module("App")
		.factory("itemsToCardsMapper", itemsToCardsMapper);

		itemsToCardsMapper.$inject = ["expressionEvaluator", "filterService"];

		function itemsToCardsMapper(expressionEvaluator, filterService) {

			return function(items, cardConfig) {

				var cards = [];

				if(angular.isArray(items)) {

					items.forEach(function(item) {
		                var card = createCard(item, cardConfig);

		                cards.push(card); 
		            });
				}

	            return cards;
        	};

        	function createCard(item, cardConfig) {

		        return {
		            item: item,
		            showDetails: cardConfig.showDetails,
		            color: getCardColor(item, cardConfig.color),
		            progressBars: getProgressBars(item, cardConfig.progressbars),
		            url: item[cardConfig.url.field],
		            name: item[cardConfig.name.field],
		            leftIcons: getIcons(item, cardConfig.iconsLeft),
		            rightIcons: getIcons(item, cardConfig.iconsRight),
		            mainValue: getMainValue(item, cardConfig.mainValue),
		            details: getDetails(item, cardConfig.details)
		        };
		    }

		    function getDetails(item, detailsConfig) {

		    	if(!detailsConfig) {
		    		return [];
		    	}

		    	var details = [];

		    	detailsConfig.forEach(function(detailConfig) {

		    		var detail = angular.copy(detailConfig);
		    		detail.value = expressionEvaluator.eval(item, detailConfig.expression);

		    		if(angular.isArray(detail.value)){

		    			detail.value.forEach(function(v) {

		    				var det = angular.copy(detail);
		    				det.value = v;
		    				details.push(det);

		    			});
		    		}
		    		else {
		    			details.push(detail);
		    		}
		    	});

		    	return details;
		    }

		    function getMainValue(item, mainValueConfig) {
		        var mainValue = angular.copy(mainValueConfig);
		        mainValue.value = expressionEvaluator.eval(item, mainValueConfig.expression);
		        return mainValue;
		    }

		    function getIcons(item, iconsConfig) {
		        var icons = [];

		        iconsConfig.forEach(function(iconConfig) {
		            var icon = angular.copy(iconConfig);
		            icon.value = expressionEvaluator.eval(item, iconConfig.expression);
		            icons.push(icon);
		        });

		        return icons;            
		    }

		    function getProgressBars(item, progressBarsConfig) {

		        var progressBars = [];

		        progressBarsConfig.forEach(function(bar) {
		            var progressbar = angular.copy(bar);
		            progressbar.value = item[bar.field];
		            progressBars.push(progressbar);
		        });

		        return progressBars;
		    }

		    function getCardColor(item, colors) {

		        var defaultColor = "lightblue"; 
		        
		        var color = defaultColor;

		        for(var i = 0; i < colors.length; i++) {

		            if(filterService.match(item, colors[i].criteria)){
		                color = colors[i].color;
		                break;
		            }
		        }

		        return color;
		    }
		    
		}
})();
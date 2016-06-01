(function () {
	angular
		.module("App")
		.factory("itemsToGridModelMapper", itemsToGridModelMapper);

	itemsToGridModelMapper.$inject = ["$filter", "expressionEvaluator", "cardsCacheService"];

	function itemsToGridModelMapper($filter, expressionEvaluator, cardsCacheService) {

		return function(items, filter, gridConfig) {
			var columns = $filter("orderBy")(getUniqueColumns(items, gridConfig.column), function(column){
                if(gridConfig.column.order) {
                    var index = gridConfig.column.order.indexOf(column.value);

                    if(index != -1) {
                        return index;
                    }
                    else {
                        return column.value;
                    }    
                } else {
                    return column.value;
                }
            });

			var filteredItems = $filter("filterMultiple")(items, filter);
			var groups = getGroups(filteredItems, columns, gridConfig);

			var gridModel = {
				columns: columns,
				groups: groups
			};

			return gridModel;
		}

		function getUniqueColumns(items, columnConfig) {
            var columns = [];

            angular.forEach(items, function(item) {
                
                var value = expressionEvaluator.eval(item, columnConfig.value.expression);

                var exist = columns.filter(function(col) { return col.value === value }).length > 0;

                if(!exist) {
                    
                    var displayValue = expressionEvaluator.eval(item, columnConfig.displayValue.expression);

                    columns.push({
                        value: value,
                        displayValue: displayValue
                    });
                }
            });

            return columns;
        }

		function getGroups (items, columns, gridConfig) {
	        var groups = splitByGroups(gridConfig.groupBy, items);

	        splitByColumns(gridConfig, columns, groups);

	        return $filter("orderBy")(groups, getOrderBy(gridConfig.groupBy));
	    }

	    function getOrderBy(groupBy) {
            var orderBy = [];

            for(var i = 0; i < groupBy.length; i++) {
                orderBy.push("group." + groupBy[i].field);
            }

            return orderBy;
        }

        function getUniqueGroupValues(groupName, items){
            var result = [];

            angular.forEach(items, function(item) {
                if(result.indexOf(item[groupName]) === -1) {
                    result.push(item[groupName]);
                }   
            });

            return result;
        }

        function getItemsByProperty(propName, propValue, items) {
            var result = [];
            angular.forEach(items, function(item) {
                if(item[propName] === propValue){
                    result.push(item);
                }
            });

            return result;
        }

        function splitByGroup(groupName, groups) {
            var result = [];

            for(var i = 0; i < groups.length; i++) {
                var uniqueGroupValues = getUniqueGroupValues(groupName, groups[i].items);

                for(var j = 0; j < uniqueGroupValues.length; j++) {
                    var groupItems = getItemsByProperty(groupName, uniqueGroupValues[j], groups[i].items);

                    var groupCopy = angular.copy(groups[i].group);

                    groupCopy[groupName] = uniqueGroupValues[j];

                    result.push({
                        group: groupCopy,
                        items: groupItems
                    });
                }
            }

            return result;
        }

        function splitByGroups(groups, items) {

            var groupsArr = [{group: {}, items: items}];
            for(var i = 0; i < groups.length; i++) {
                groupsArr = splitByGroup(groups[i].field, groupsArr);
            }

            return groupsArr;

        }

        function splitByColumns(gridConfig, columns, groups) {
            for(var i = 0; i < groups.length; i++) {
                groups[i].columns = [];
                for(var j = 0; j < columns.length; j++) {
                    var items = getItemsForColumn(gridConfig.column, columns[j], groups[i].items);

                    items = $filter("orderBy")(items, gridConfig.card.orderBy);

                    var cards =[];

                    if(gridConfig.showCards) {
                        var cards = getCardsForItems(items);    
                    }

                    groups[i].columns.push({column: columns[j], items: items, cards: cards}); 
                }

                groups[i].columns = $filter("orderBy")(groups[i].columns, function(column){
                    if(gridConfig.column.order) {
                        var index = gridConfig.column.order.indexOf(column.column.value);

                        if(index != -1) {
                            return index;
                        }
                        else {
                            return column.column.value;
                        }    
                    } else {
                        return column.column.value;
                    }
                });
            }
        }

        function getItemsForColumn(columnConfig, column, items) {

            var result = [];

            angular.forEach(items, function (item) {

                var value = expressionEvaluator.eval(item, columnConfig.value.expression);

                if(value === column.value) {
                    result.push(item);
                }

            });

            return result;

        }

        function getCardsForItems(items){

            var cards = [];

            items.forEach(function(item) { 

                var card = _.find(cardsCacheService.getCards(), function(card) { return card.item === item; });

                if(card) {
                    cards.push(card);
                }

            });

            return cards;
        }

	}

})();
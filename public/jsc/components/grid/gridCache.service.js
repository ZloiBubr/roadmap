(function(){
	angular
		.module("App")
		.factory("gridCacheService", gridCacheService)
		.constant("CardsRenderBatchSize", 10);

	gridCacheService.$inject = ["CardsRenderBatchSize"];

	function gridCacheService(CardsRenderBatchSize) {

		var cachedData = [];

		return {
			init: init,
			loadNext: loadNext
		}

		function init(data) {
			cachedData = data;
		}

		function loadNext (currentData) {
            
            var cardsToLoad = CardsRenderBatchSize;
            var cardsLoaded = 0;
            while(cardsLoaded < cardsToLoad && hasMoreCachedData(currentData, cachedData)){

                cardsLoaded += loadGroupOrCards(currentData);
            }
        }

        function loadGroupOrCards(currentData) {
            var cardsLoaded = 0;            
            var groupIndex = currentData.length - 1;
            var lastGroup = currentData[groupIndex];
            var cacheGroup = cachedData[groupIndex];

            if(groupIndex > -1 && hasMoreCards(lastGroup, cacheGroup)) {

                 cardsLoaded = loadCards(lastGroup, cacheGroup);
            }
            else {
                cardsLoaded = loadGroup(currentData);
            }

            return cardsLoaded;
        }

        function loadGroup(currentData) {
            var maxColCardsLoaded = 0;
            var groupIndex = currentData.length - 1;
            var cacheGroup = cachedData[groupIndex];

            if(groupIndex + 1 < cachedData.length) {
                var cacheGroup = cachedData[groupIndex + 1];
                var group = {
                    group: cacheGroup.group,
                    items: cacheGroup.items,
                    columns: []
                }

                for(var i = 0; i < cacheGroup.columns.length; i++) {
                    group.columns.push({
                        cards: [],
                        column: cacheGroup.columns[i].column,
                        items: cacheGroup.columns[i].items
                    });
                }

                maxColCardsLoaded = loadCards(group, cacheGroup);

                currentData.push(group);   
            }

            return maxColCardsLoaded;
        }

        function loadCards(group, cacheGroup) {
            
            var cardsToLoad = CardsRenderBatchSize;
            var columnsCount = group.columns.length;

            var maxColCardsLoaded = 0;

            for(var i = 0; i < columnsCount; i++) {
                var column = group.columns[i];
                var cacheColumn = cacheGroup.columns[i];

                var lastCardIndex = column.cards.length - 1;
                for(var j = 1; j <= cardsToLoad && column.cards.length < cacheColumn.cards.length; j++) {

                    if(maxColCardsLoaded < j) {
                        maxColCardsLoaded = j;
                    }

                    column.cards.push(cacheColumn.cards[lastCardIndex + j]);
                }
            }    

            return maxColCardsLoaded;
        }

        function hasMoreCards(group, cacheGroup) {

            var hasMoreCards = false;
            var columnCount = group.columns.length;
            for(var i = 0; i < columnCount; i++) {
                var column = group.columns[i];
                var cacheColumn = cacheGroup.columns[i];
                if(column.cards.length < cacheColumn.cards.length) {
                    hasMoreCards = true;
                    break;
                }
            }

            return hasMoreCards;
        }

        function hasMoreCachedData(renderedGroups, cachedGroups) {

            if(cachedGroups.length === 0)
            {
                return false;
            }
            else if(renderedGroups.length < cachedGroups.length) { 
                return true;
            } else {

                var lastRenderedGroup = null;
                
                if(renderedGroups.length > 0) {
                   lastRenderedGroup = renderedGroups[renderedGroups.length - 1];
                }

                var lastCachedGroup = cachedGroups[cachedGroups.length - 1];

                if(lastRenderedGroup !== null && lastCachedGroup !== null) {
                    return hasMoreCards(lastRenderedGroup, lastCachedGroup);    
                }
                else {
                    return false;
                }
            }
        }
	}
})();
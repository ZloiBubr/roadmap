(function(){
	angular
		.module("App")
		.factory("cardsCacheService", cardsCacheService);

	cardsCacheService.$inject = ["itemsToCardsMapper"];

	function cardsCacheService(itemsToCardsMapper) {

		return {
			init: init,
			getCards: getCards
		};

		var cards = [];

		function init(items, cardConfig){
			cards = itemsToCardsMapper(items, cardConfig);
		}

		function getCards() {
			return cards;
		}
	}

})();
(function(){
	angular
		.module("App")
		.factory("filterStateService", filterStateService);

	filterStateService.$inject = ["localStorageService"];

	function filterStateService(localStorageService) {

		return {
			save: save,
			restore: restore
		};

		function save(key, state) {

		}

		function restore(key) {

		}


		function saveStorageToLocalDb() {
                  // save session
                  // var storage = {
                  //     showStreams: $scope.showStreams,
                  //     showCards: $scope.showCards,
                  //     showModules: $scope.showModules,
                  //     filteredVersion: $scope.filteredVersion,
                  //     filteredSme: $scope.filteredSme,
                  //     filteredMG: $scope.filteredMG,
                  //     filteredTeam: $scope.filteredTeam,
                  //     total_inProgress_isChecked: $scope.total.inProgress.isChecked,
                  //     total_readyForQA_isChecked: $scope.total.readyForQA.isChecked,
                  //     total_resolved_isChecked: $scope.total.resolved.isChecked,
                  //     total_accepted_isChecked: $scope.total.accepted.isChecked,
                  //     total_cancelled_isChecked: $scope.total.cancelled.isChecked,
                  //     total_notApplicable_isChecked: $scope.total.notApplicable.isChecked,
                  //     total_production_isChecked: $scope.total.production.isChecked,
                  //     total_pmReview_isChecked: $scope.total.pmReview.isChecked,
                  //     total_laReady_isChecked: $scope.total.laReady.isChecked,
                  //     total_all_isChecked: $scope.total.all.isChecked
                  // };
                  // localStorageService.set('moduleProgressController', storage);
            };

              function loadStorageFromLocalDb() {
                  // restore session
                  // if(!_.isEmpty(localStorageService.get('moduleProgressController')))
                  // {
                  //     try {
                  //         var storage = localStorageService.get('moduleProgressController');
                  //             $scope.showStreams = storage.showStreams;
                  //             $scope.showCards = storage.showCards;
                  //             $scope.showModules = storage.showModules;
                  //             $scope.filteredVersion = storage.filteredVersion;
                  //             $scope.filteredSme = storage.filteredSme;
                  //             $scope.filteredMG = storage.filteredMG;
                  //             $scope.filteredTeam = storage.filteredTeam;
                  //             $scope.total.inProgress.isChecked = storage.total_inProgress_isChecked;
                  //             $scope.total.readyForQA.isChecked = storage.total_readyForQA_isChecked;
                  //             $scope.total.resolved.isChecked = storage.total_resolved_isChecked;
                  //             $scope.total.accepted.isChecked = storage.total_accepted_isChecked;
                  //             $scope.total.cancelled.isChecked = storage.total_cancelled_isChecked;
                  //             $scope.total.notApplicable.isChecked = storage.total_notApplicable_isChecked;
                  //             $scope.total.production.isChecked = storage.total_production_isChecked;
                  //             $scope.total.pmReview.isChecked = storage.total_pmReview_isChecked;
                  //             $scope.total.laReady.isChecked = storage.total_laReady_isChecked;
                  //             $scope.total.all.isChecked = storage.total_all_isChecked;
                  //     }
                  //     catch (ex) {
                  //         console.error(ex);
                  //     }
                  // }
	     }
      }
})();
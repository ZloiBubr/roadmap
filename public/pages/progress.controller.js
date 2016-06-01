(function(){
    angular
        .module("App")
        .controller("ProgressController", ProgressController);

    ProgressController.$inject = ["$scope", "$resource", "$filter", "filterStateService", "$stateParams", "configService", "itemsToGridModelMapper", "cardsCacheService"];    

    function ProgressController($scope, $resource, $filter, filterStateService, $stateParams, configService, itemsToGridModelMapper, cardsCacheService) {
        
        var config = configService.getConfig($stateParams.type);

        var resourceUrl = "";

        switch($stateParams.type) {
            case "epic":
                resourceUrl = "/moduledata";
                break;
            case "story":
                resourceUrl = "/cloudAppData";
                break;
        }

        var dataResource = $resource(resourceUrl);

        $scope.$watch("progressData", function (data) {
            
            cardsCacheService.init(data, $scope.config.grid.card);

            updateFilteredByFilters();

            updateGridModel();
        });

        $scope.$watch("allFilters", function() {
            updateGridModel();
            updateFileredData();
        });

        $scope.$watch("config.grid.groupBy", function() {
            updateGridModel();
        });

        $scope.$watch("config.grid.showCards", function(){
           updateGridModel(); 
       });

        $scope.$watch("selectedFilters", function(){
            updateFilteredByFilters();
            updateFileredData();
        });

        $scope.$watch("config.grid.card.showDetails", function(){

            var cards = cardsCacheService.getCards();

            cards.forEach(function(card){
                card.showDetails = $scope.config.grid.card.showDetails;
            });

        });

        function updateFilteredByFilters() {
           $scope.filteredByFilters = $filter("filterMultiple")($scope.progressData, $scope.selectedFilters); 
        }

        function updateGridModel() {
            $scope.gridModel = itemsToGridModelMapper($scope.progressData, $scope.allFilters, $scope.config.grid);
        }

        function updateFileredData(){
            $scope.filteredData = $filter("filterMultiple")($scope.progressData, $scope.allFilters);
        }

        function getData () {

            $scope.loading = true;

            var success = function (data) {
                $scope.progressData = data;

                autofillFilters(config.filterGroups, $scope.progressData);

                $scope.loading = false;
            };

            var fail = function (err) {
                $scope.errMessage = err;

                $scope.loading = false;
            };

            dataResource.query({}, success, fail);
        };

        $scope.updateSelectedFilters = function() {

            var filterCriteria = {
                type: "operation",
                operator: "and",
                operands: []
            };

            angular.forEach($scope.config.filterGroups, function(filterGroup) {
                var groupCriteria = {
                    type: "operation",
                    operator: filterGroup.operator,
                    operands: []
                }

                angular.forEach(filterGroup.filters, function(filter) {
                    if(isSelected(filter)) {
                        groupCriteria.operands.push(filter.criteria);
                    }
                });

                if(groupCriteria.operands.length > 0) {
                    filterCriteria.operands.push(groupCriteria);    
                }
            });

            if(filterCriteria.operands.length > 0) {
                $scope.selectedFilters = filterCriteria;            
            }
            else {
                $scope.selectedFilters = undefined;   
            }

            //Statuses
            var statusesCriteria = {
                    type: "operation",
                    operator: "or",
                    operands: []
                };

            angular.forEach($scope.config.statuses, function(status) {
                if(status.isChecked) {
                    statusesCriteria.operands.push(status.criteria);
                }
            });

            // All filters
            var allFilters = {
                type: "operation",
                operator: "and",
                operands: []
            };

            if(filterCriteria.operands.length > 0) {
                allFilters.operands.push(filterCriteria);
            }

            if(statusesCriteria.operands.length > 0) {
                allFilters.operands.push(statusesCriteria);
            }
            else {
                allFilters.operands.push({type: "criteria", field: "", value: "" });
            }

            $scope.allFilters = allFilters;
        }

        function isSelected(filter) {
            if(filter.type === "checkbox") {
                return filter.isChecked;
            }
            else if(filter.type === "dropdown") {
                return angular.isDefined(filter.criteria);
            }
        }

        function autofillFilters(filterGroups, modules) {

            angular.forEach(filterGroups, function(filterGroup) {
                for(var i = 0; i < filterGroup.filters.length; i++) {
                    var filter = filterGroup.filters[i];
                    if(filter.type === "dropdown") {

                        if(filter.autofill) {
                            var field = filter.autofill.field;

                            var values = [];
                            angular.forEach(modules, function (module) {

                                if(values.indexOf(module[field]) === -1) {
                                    values.push(module[field]);
                                }

                            });

                            values.sort();
                            
                            angular.forEach(values, function(value){
                                filter.values.push({
                                    name: value,
                                    criteria: {
                                        type: "operation",
                                        operator: "and",
                                        operands: [
                                            {type: "criteria", field: filter.autofill.field, value: value}
                                        ]
                                    }
                                });                            
                            });    
                        }
                    }
                }
            });
        }

        $scope.init = function () {

            $scope.loading = false;
            
            $scope.isShowSideBar = true;

            $scope.filteredByFilters = [];

            $scope.filteredData = [];

            $scope.gridModel = {columns: [], groups: []};

            $scope.config = config;

            $scope.updateSelectedFilters();

            getData();
        };

        $scope.groupBy = function(group) {
            
            var groups = [];

            angular.forEach($scope.config.groupBy, function(group) {
                if(group.isChecked) {
                    groups.push(group);    
                }
            });

            $scope.config.grid.groupBy = groups;
        }

        $scope.init();
    }
})();
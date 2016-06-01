(function(){
    angular
        .module("App")
        .controller("roadmapController", roadmapController);

    roadmapController.$inject = ["$scope", "$resource", "$window", "$filter", "localStorageService"];

    function roadmapController($scope, $resource, $window, $filter, localStorageService) {
        var moduleDataResource = $resource('/roadmapdata');

        /* ------------------------------------------------------ Init/Reinit -------------------------------*/
        $scope.init = function () {
            $scope.common = {};
            $scope.dataLoad();
            $scope.moduleDueData = [];
            $scope.filteredVersion = $scope.allVersions[0];
        };

        $scope.reInit = function () {
            $scope.dataLoad();
        };

        $scope.dataLoad = function () {
            $scope.getModuleData();
            $scope.moduleDueData = [];
        };

        $scope.reInitTotal = function(){
            $scope.moduleDueData = [];
        };


        function FillVersionsCombo() {
            $scope.allVersions = [{id: "All", name: "All"}];
            _.each($scope.epics, function(epicObj){
                var found = false;
                _.each($scope.allVersions, function(versionObj) {
                    if(versionObj.name == epicObj.fixVersion) {
                        found = true;
                    }
                });
                if (!found) {
                    $scope.allVersions.push({id: epicObj.fixVersion, name: epicObj.fixVersion});
                }
            });
        }

        function SortCombos() {
            $scope.allVersions.sort(function (a, b) {
                a = a.name;
                b = b.name;
                if (a == "All") {
                    return -1;
                }
                if (b == "All") {
                    return 1;
                }
                return a > b ? 1 : a < b ? -1 : 0;
            });
        }

        function fillAllCombos() {
            FillVersionsCombo();
            SortCombos();
        }

        $scope.processWithRowSpans = function (addCards) {
            $scope.roadmapDataRows = [];
            if($scope.epics == undefined) {
                return;
            }
            if(addCards) {
                $scope.saveStorageToLocalDb();
            }

            _.each($scope.epics, function(EpicObj) {
                if(addCards && $scope.filteredVersion != $scope.allVersions[0].id) {
                    if (EpicObj.fixVersion != $scope.filteredVersion) {
                        return;
                    }
                }

                if(addCards) {
                    ProcessCards($scope.roadmapDataRows, EpicObj);
                }
            });
            $scope.roadmapDataRows.sort(function (a, b) {
                a = a.version;
                b = b.version;
                return a > b ? 1 : a < b ? -1 : 0;
            });
        };

        function ProcessCards(roadmapDataRows, epicObj) {
            var rowItem;
            var found = false;
            _.each(roadmapDataRows, function(row) {
                if(row.version == epicObj.fixVersion) {
                    rowItem = row;
                    found = true;
                }
            });
            if(!found) {
                rowItem = createNewRow(epicObj);
                roadmapDataRows.push(rowItem);
            }
            pushEpicToRow(rowItem, epicObj);
        }

        function createNewRow(epicObj) {
            var newRow = {
                version: epicObj.fixVersion,
                components: []
            };
            _.each($scope.components, function(component) {
                var componentObj = {name: component, epics: []};
                newRow.components.push(componentObj);
            });

            return newRow;
        }

        function pushEpicToRow(rowItem, epicObj) {
            _.each(rowItem.components, function(component) {
                if(epicObj.epic.components.length > 0) {
                    _.each(epicObj.epic.components, function(epicComponent) {
                        if(component.name == epicComponent) {
                            component.epics.push(epicObj);
                        }
                    });
                }
                else {
                    if(component.name == "Undefined") {
                        component.epics.push(epicObj);
                    }
                }
            });
        }

        /* -------------------------------------------------------Event handlers ------------------------ */
        /* --------------------------------------------- Actions ------------------------------*/
        $scope.getModuleData = function () {
            var loadingDfrd = $.Deferred();

            var getModuleSuccess = function (data) {
                $scope.epics = data.Epics;
                $scope.components = data.Components;
                fillAllCombos();
    //            $scope.processWithRowSpans(false);
                $scope.loadStorageFromLocalDb();
                $scope.filterModule();
                loadingDfrd.resolve();
            };

            var getModuleFail = function (err) {
                $scope.errMessage = err;
                loadingDfrd.reject(err);
            };

            moduleDataResource.get($scope.common, getModuleSuccess, getModuleFail);
            return loadingDfrd.promise();
        };



        /* ------------------------------------------- DOM/Angular events --------------------------------------*/
        $scope.onFilterChange = function()
        {
            $scope.processWithRowSpans(true);
        };

        $scope.onSelectDeselectAll = function()
        {
            $scope.processWithRowSpans(true);
        };

        $scope.onToggleSideBar = function(){
            $scope.isShowSideBar = !$scope.isShowSideBar;
        };

        /* ----------------------------------------- Helpers/Angular Filters and etc-----------------------------------*/


        $scope.filterModule = function()
        {
            $scope.processWithRowSpans(true);
        };

        $scope.saveStorageToLocalDb = function() {
            // save session
            var storage = {
                filteredVersion: $scope.filteredVersion,
            };
            localStorageService.set('roadmapController', storage);
        };

        $scope.loadStorageFromLocalDb = function() {
            // restore session
            if(!_.isEmpty(localStorageService.get('roadmapController')))
            {
                try {
                    var storage = localStorageService.get('roadmapController');
                    $scope.filteredVersion = storage.filteredVersion;
                }
                catch (ex) {
                    console.error(ex);
                }
            }
        };

        $scope.init();
    }
})();



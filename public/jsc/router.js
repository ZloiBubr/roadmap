/**
 * Created by Heorhi_Vilkitski on 3/28/14.
 */

(function(){
    angular
    .module("App")
    .config(function($stateProvider, $urlRouterProvider, _) {
        //
        // For any unmatched url, redirect to /login
        $urlRouterProvider.otherwise("/login");
        //
        // Now set up the states
        $stateProvider
            .state("login", {
                url: "/login",
                templateUrl: "pages/login.html",
                controller: "LoginCtrl"
            })
            .state("register", {
                url: "/register",
                templateUrl: "pages/register.html",
                controller: "RegisterCtrl",
                controllerAs: "vm"
            })
            .state("admin", {
                url: "/admin",
                templateUrl: "pages/admin.html",
                controller: "AdminController",
                controllerAs: "vm",
                access: {
                    requiredLogin: true,
                    groups: ["Administrators"]
                }
            })
            .state('home2', {
                url: "/",
                templateUrl: "pages/roadmapView.html",
                access: {
                    requiredLogin: true
                }
            })
            .state('home', {
                url: "/cumulative",
                templateUrl: "pages/roadmapView.html",
                access: {
                    requiredLogin: true
                }
            })
    })
    .run(function($rootScope, $window, $location, AuthenticationFactory) {
        // when the page refreshes, check if the user is already logged in
        AuthenticationFactory.check();
 
      $rootScope.$on("$stateChangeStart", function(event, nextRoute, currentRoute) {
        if ((nextRoute.access && nextRoute.access.requiredLogin) && !AuthenticationFactory.isLogged) {
          $location.path("/login");
        } else {
            
            // check if user object exists else fetch it. This is incase of a page refresh
            //if (!AuthenticationFactory.user) AuthenticationFactory.user = $window.sessionStorage.user;
          //if (!AuthenticationFactory.userRole) AuthenticationFactory.userRole = $window.sessionStorage.userRole;

            if(nextRoute.access && nextRoute.access.groups) {
                if(_.intersection(nextRoute.access.groups, AuthenticationFactory.user.groups).length === 0) { 
                    $location.path("/");   
                }
            }
        }
      });
 
      $rootScope.$on('$stateChangeSuccess', function(event, nextRoute, currentRoute) {
        $rootScope.showMenu = AuthenticationFactory.isLogged;
        //$rootScope.role = AuthenticationFactory.userRole;
        // if the user is already logged in, take him to the home page
        if (AuthenticationFactory.isLogged == true && $location.path() == '/login') {
          $location.path('/');
        }
      });
    });

})();


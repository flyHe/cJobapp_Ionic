
'use strict';

var options = {};
options.api = {};
options.api.base_url = "http://localhost:8080/comp_api/v1";
var app = angular.module('app', ['ionic','app.controllers','ui.router','app.services','ngCordova']);

app.run(function($ionicPlatform) {
	  $ionicPlatform.ready(function() {
	    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
	    // for form inputs)
	    if(window.cordova && window.cordova.plugins.Keyboard) {
	      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
	    }
	    if(window.StatusBar) {
	      StatusBar.styleDefault();
	    }
	  });
	});
app.config(function($stateProvider, $urlRouterProvider) {

	// Ionic uses AngularUI Router which uses the concept of states
	// Learn more here: https://github.com/angular-ui/ui-router
	// Set up the various states which the app can be in.
	// Each state's controller can be found in controllers.js
	
	$stateProvider
		// 首页
 .state('app', {
	      url: "/app",
	      abstract: true,
	      templateUrl: "templates/menu.html",
	      controller: 'appCtrl'
	    })
 .state('login',{
           url:'/login',
           templateUrl:'templates/login.html',
           controller:'AdminUserCtrl'
        })
 .state('app.positions', {
      url: "/positions",
      views: {
        'menuContent' :{
          templateUrl: "templates/positions.html",
          controller: 'positionsCtrl'
        }
      }
    })
 .state('app.positionDetail', {
      url: "/positionDetail/:gangWeiBh",
      views: {
        'menuContent' :{
          templateUrl: "templates/positionDetail.html",
          controller: 'positionDetailCtrl'
        }
      }
    })
 .state('app.resumeList', {
      url: "/resumeList/:gangWeiBh",
      views: {
        'menuContent' :{
          templateUrl: "templates/resumeList.html",
          controller: 'resumeListCtrl'
        }
      }
    })
  .state('app.resumeDetail', {
      url: "/resumeDetail/:personid",
      views: {
        'menuContent' :{
          templateUrl: "templates/resumeDetail.html",
          controller: 'resumeDetailCtrl'
        }
      }
    })
 .state('app.talents', {
      url: "/talents",
      views: {
        'menuContent' :{
          templateUrl: "templates/talents.html",
          controller: 'talentsCtrl'
        }
      }
    })
.state('app.talentDetail', {
      url: "/talentDetail/:companyTalentid",
      views: {
        'menuContent' :{
          templateUrl: "templates/talentDetail.html",
          controller: 'talentDetailCtrl'
        }
      }
    })
 .state('app.search', {
        url: "/search",
        views: {
          'menuContent' :{
            templateUrl: "templates/search.html",
            controller: 'searchCtrl'
          }
        }
      })
 .state('app.search.searchResult', {
        url: "/searchResult/:key",
        views: {
          'searchResult' :{
            templateUrl: "templates/searchResult.html",
            controller: 'searchResultCtrl'
          }
        }
      })
 .state('app.talentEx', {
      url: "/talentEx/:personid",
      views: {
        'menuContent' :{
          templateUrl: "templates/talentEx.html",
          controller: 'talentExCtrl'
        }
      }
    })
 .state('app.more', {
      url: "/more",
      views: {
        'menuContent' :{
          templateUrl: "templates/more.html",
          controller: 'moreCtrl'
        }
      }
    })
 .state('compInfo', {
      url: "/compInfo",    
      templateUrl: "templates/compInfo.html",
      controller: 'compInfoCtrl'
    })
        // 默认路由
        $urlRouterProvider.otherwise('/app/positions');
});


app.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.interceptors.push('TokenInterceptor');
}]);

app.run(['$rootScope', '$window', '$location', '$log','AuthenticationService', function ($rootScope, $window, $location, $log,AuthenticationService) {

	 $rootScope.$on('$locationChangeStart',function locationChangeStart(event) {
        $log.log('locationChangeStart');
        $log.log(arguments);
      
      if(!AuthenticationService.isAuthenticated&&!$window.sessionStorage.token) {$location.path("/login");
    	  /*$log.log('未登录');*/
      }
       else {
    	   $log.log('已登录');
       }
    })

   $rootScope.$on('$locationChangeSuccess', function locationChangeSuccess(event) {
        $log.log('locationChangeSuccess');
        $log.log(arguments);
    })

   $rootScope.$on('$routeChangeStart', function routeChangeStart(event) {
        $log.log('routeChangeStart');
        $log.log(arguments);
    })

    $rootScope.$on('$routeChangeSuccess',function routeChangeSuccess(event) {
        $log.log('routeChangeSuccess');
        $log.log(arguments);
    })
}]);

app.config(function($httpProvider) {
    $httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded';
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
 
    // Override $http service's default transformRequest
    $httpProvider.defaults.transformRequest = [function(data) {
        /**
         * The workhorse; converts an object to x-www-form-urlencoded serialization.
         * @param {Object} obj
         * @return {String}
         */
        var param = function(obj) {
            var query = '';
            var name, value, fullSubName, subName, subValue, innerObj, i;
 
            for (name in obj) {
                value = obj[name];
 
                if (value instanceof Array) {
                    for (i = 0; i < value.length; ++i) {
                        subValue = value[i];
                        fullSubName = name + '[' + i + ']';
                        innerObj = {};
                        innerObj[fullSubName] = subValue;
                        query += param(innerObj) + '&';
                    }
                } else if (value instanceof Object) {
                    for (subName in value) {
                        subValue = value[subName];
                        fullSubName = name + '[' + subName + ']';
                        innerObj = {};
                        innerObj[fullSubName] = subValue;
                        query += param(innerObj) + '&';
                    }
                } else if (value !== undefined && value !== null) {
                    query += encodeURIComponent(name) + '='
                            + encodeURIComponent(value) + '&';
                }
            }
 
            return query.length ? query.substr(0, query.length - 1) : query;
        };
 
        return angular.isObject(data) && String(data) !== '[object File]'
                ? param(data)
                : data;
    }];
});

app.run(function ($ionicPlatform) {

    $ionicPlatform.ready(function () {

      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
    })
  })
/*在主页增加按返回键提出退出应用，在其它页面正常返回上个页面，只要注册一个处理事件就可以了*/
app.run(['$ionicPlatform', '$ionicPopup','$rootScope','$location', function ($ionicPlatform, $ionicPopup, $rootScope, $location) {

    //主页面显示退出提示框
    $ionicPlatform.registerBackButtonAction(function (e) {

        e.preventDefault();

        function showConfirm() {
            var confirmPopup = $ionicPopup.confirm({
                title: '<strong>退出应用?</strong>',
                template: '你确定要退出应用吗?',
                okText: '退出',
                cancelText: '取消'
            });

            confirmPopup.then(function (res) {
                if (res) {
                    ionic.Platform.exitApp();
                } else {
                    // Don't close
                }
            });
        }

        // Is there a page to go back to?
        if ($location.path() == '/app/positions'||$location.path() == '/login' ) {
            showConfirm();
        } else if ($rootScope.$viewHistory.backView ) {
            console.log('currentView:', $rootScope.$viewHistory.currentView);
            // Go back in history
           /* $rootScope.$viewHistory.backView.go();*/
            history.go(-1);
        } else {
            // This is the last page: Show confirmation popup
          /*  showConfirm();*/
            history.go(-1);
        }

        return false;
    }, 101);

}]);
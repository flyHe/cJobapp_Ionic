
angular.module( "app.controllers", [] )

    .controller('appCtrl', function($scope,  $stateParams) {
    
})
    .controller('positionsCtrl', function($scope,$http,PopupService,dateService) {
   	 /*获取岗位列表*/
   
        $scope.positions = [];
        $scope.page = 1;
        $scope.moreDataCanBeLoaded=true;
        $scope.loadMore = function() {
        $http.get(options.api.base_url+"/positions"+"?page="+$scope.page)
            .success(function(data) {
           
            	var datarows=data.rows;
            	/*alert(datarows);*/
        if(datarows !=''){
        	if(data.page!=$scope.ppage){
            var count=datarows.length;
            for (var i = 0; i < count; i++) {
            	/*dateService.formatDate("1419474593000"); */
            	/*datarows[i].FaBuSj=dateService.formatDate(datarows[i].FaBuSj);
            	datarows[i].ToiDiRq=dateService.formatDate(datarows[i].ToiDiRq);*/
                var   f=new   Date(datarows[i].FaBuSj); 
                datarows[i].FaBuSj=dateService.formatDate(f);
                var   t=new   Date(datarows[i].ToiDiRq); 
                datarows[i].ToiDiRq=dateService.formatDate(t);
                $scope.positions.push(datarows[i]);
                         }
            $scope.ppage= $scope.page;
            $scope.page+= 1 ;}
            $scope.$broadcast('scroll.infiniteScrollComplete');}
        else{       /*alert( "no more Data"); */
                $scope.moreDataCanBeLoaded=false;}
             } )
            .error(function(data,status,headers,config){
                /*alert( "no more Data"); //一些错误处理代码*/
                $scope.moreDataCanBeLoaded=false;
            })
    };
    $scope.$on('$stateChangeSuccess', function() {
        $scope.loadMore();
    });
})
    .controller('positionDetailCtrl', function($scope,$http,$stateParams,PositionService) {
    	$scope.gangWeiBh=$stateParams.gangWeiBh;
    	$scope.activePosition = function activePosition(gangWeiBh) {PositionService.activePosition($scope.gangWeiBh);};
    	$scope.shieldPosition = function shieldPosition(gangWeiBh) {PositionService.shieldPosition($scope.gangWeiBh);}
    	$scope.releasedPosition = function releasedPosition(gangWeiBh) {PositionService.releasedPosition($scope.gangWeiBh);}
    	$http.get(options.api.base_url+"/position"+"?gangWeiBh="+$scope.gangWeiBh)
    	 .success(function(data) {
    		 $scope.position=data;
    	 } )
    	 .error(function(data,status,headers,config){
 
         })
})
    .controller('resumeListCtrl', function($scope,$http,$stateParams,PositionService,dateService) {
    	$scope.gangWeiBh=$stateParams.gangWeiBh;
         $scope.resumes = [];
         $scope.page = 1;
         $scope.moreDataCanBeLoaded=true;
         $scope.loadMore = function() {
         $http.get(options.api.base_url+"/resumes"+"?gangWeiBh="+$scope.gangWeiBh+"&page="+$scope.page)
             .success(function(data) {
         var datarows=data.rows;
         if(datarows !=''){
         	if(data.page!=$scope.ppage){
             var count=datarows.length;
             for (var i = 0; i < count; i++) {
            	 var   d=new   Date(datarows[i].deliveryDate); 
            	 datarows[i].deliveryDate=dateService.formatDate(d);
                 $scope.resumes.push(datarows[i]);
                          }
             $scope.ppage= $scope.page;
             $scope.page+= 1 ;}
             $scope.$broadcast('scroll.infiniteScrollComplete');}
         else{       /*alert( "no more Data"); */
                 $scope.moreDataCanBeLoaded=false;}
              } )
             .error(function(data,status,headers,config){
                 /*alert( "no more Data"); //一些错误处理代码*/
                 $scope.moreDataCanBeLoaded=false;
             })
     };
     $scope.$on('$stateChangeSuccess', function() {
         $scope.loadMore();
     });
})
    .controller('resumeDetailCtrl', function($scope,$http,$stateParams,PositionService,dateService) {
    	$scope.personid=$stateParams.personid;
    	$http.get(options.api.base_url+"/resume"+"?personid="+$scope.personid)
        .success(function(data) { 
        	$scope.resume=data;
        })
        .error(function(data,status,headers,config){
             })
        $scope.toggleGroup = function(group) {
            if ($scope.isGroupShown(group)) {
              $scope.shownGroup = null;
            } else {
              $scope.shownGroup = group;
            }
          };
          $scope.isGroupShown = function(group) {
            return $scope.shownGroup === group;
          };
})
    .controller('talentsCtrl', function($scope,$http,PopupService) {
    	$scope.talents = [];
        $scope.page = 1;
        $scope.moreDataCanBeLoaded=true;
        $scope.loadMore = function() {
        $http.get(options.api.base_url+"/companyTalents"+"?page="+$scope.page)
            .success(function(data) {
           
            	var datarows=data.rows;
            	/*alert(datarows);*/
        if(datarows !=''){
        	if(data.page!=$scope.ppage){
            var count=datarows.length;
            for (var i = 0; i < count; i++) {
                $scope.talents.push(datarows[i]);
                         }
            $scope.ppage= $scope.page;
            $scope.page+= 1 ;}
            $scope.$broadcast('scroll.infiniteScrollComplete');}
        else{       /*alert( "no more Data"); */
                $scope.moreDataCanBeLoaded=false;}
             } )
            .error(function(data,status,headers,config){
                /*alert( "no more Data"); //一些错误处理代码*/
                $scope.moreDataCanBeLoaded=false;
            })
    };
    $scope.$on('$stateChangeSuccess', function() {
        $scope.loadMore();
    });
})
    .controller('talentDetailCtrl', function($scope,$http,$stateParams,PositionService,dateService) {
    	$scope.companyTalentid=$stateParams.companyTalentid;
    	$http.get(options.api.base_url+"/companyTalent"+"?personid="+$scope.companyTalentid)
        .success(function(data) {
        	$scope.talent=data;
            var   d=new   Date($scope.talent.deliveryDate); 
            $scope.talent.deliveryDate=dateService.formatDate(d);
        })
        .error(function(data,status,headers,config){
             })
        $scope.toggleGroup = function(group) {
            if ($scope.isGroupShown(group)) {
              $scope.shownGroup = null;
            } else {
              $scope.shownGroup = group;
            }
          };
          $scope.isGroupShown = function(group) {
            return $scope.shownGroup === group;
          };
})
//TODO sdfdsfdsf
    .controller('searchCtrl', function($scope,$http,$stateParams,PositionService) {
/*    	$scope.key=$stateParams.key;
    	$http.get(options.api.base_url+"/search"+"?key="+$scope.key)
        .success(function(data) {
        	$scope.results=data.rows;
        })
        .error(function(data,status,headers,config){
             })*/
        
})
    .controller('searchResultCtrl', function($scope,$http,$stateParams,PositionService) {
        $scope.key=$stateParams.key;
        $scope.results = [];
        $scope.page = 1;
        $scope.moreDataCanBeLoaded=true;
        $scope.loadMore = function() {
        $http.get(options.api.base_url+"/search"+"?key="+$scope.key+"&page="+$scope.page)
            .success(function(data) {
           
                var datarows=data.rows;
                /*alert(datarows);*/
        if(datarows !=''){
            if(data.page!=$scope.ppage){
            var count=datarows.length;
            for (var i = 0; i < count; i++) {
                $scope.results.push(datarows[i]);
                         }
            $scope.ppage= $scope.page;
            $scope.page+= 1 ;}
            $scope.$broadcast('scroll.infiniteScrollComplete');}
        else{       /*alert( "no more Data"); */
                $scope.moreDataCanBeLoaded=false;}
             } )
            .error(function(data,status,headers,config){
                /*alert( "no more Data"); //一些错误处理代码*/
                $scope.moreDataCanBeLoaded=false;
            })
    };
    $scope.$on('$stateChangeSuccess', function() {
        $scope.loadMore();
    });
})
    .controller('talentExCtrl', function($scope,$http,$stateParams,PositionService,TalentService) {
        $scope.contactCanBeLoaded = false;
        $scope.addTalent = function(){TalentService.addTalent($scope.personid)};
        $scope.viewContact = function(){TalentService.viewContact($scope.personid)
              .success(function(data){
                $scope.contactCanBeLoaded = true;
                $scope.talentContact=data;
            })
              .error(function(data,status,headers,config){
                PopupService.showAlert( "无法连接服务"); //一些错误处理代码
            });
        };
        $scope.personid=$stateParams.personid;
        $http.get(options.api.base_url+"/resumeEx"+"?personid="+$scope.personid)
        .success(function(data) {
            $scope.talentEx=data;
        })
        .error(function(data,status,headers,config){
             })
        $scope.toggleGroup = function(group) {
            if ($scope.isGroupShown(group)) {
              $scope.shownGroup = null;
            } else {
              $scope.shownGroup = group;
            }
          };
          $scope.isGroupShown = function(group) {
            return $scope.shownGroup === group;
          };
    
})
    .controller('moreCtrl', function($scope,$location,$window,AuthenticationService) {
    	$scope.logOut=function(){
    		 if (AuthenticationService.isAuthenticated) {
    			 AuthenticationService.isAuthenticated = false;
                 delete $window.sessionStorage.token;
                 $location.path("/");
    		 }
    	}
})
    .controller('compInfoCtrl', function($scope,$http) {
     
        $http.get(options.api.base_url+"/getCompanyInfo")
         .success(function(data) {
             $scope.compInfo=data;
         } )
         .error(function(data,status,headers,config){
 
         })
})


    /*用户管理 */  
    .controller('AdminUserCtrl', ['$scope', '$location', '$window', 'UserService', 'AuthenticationService','$ionicLoading','PopupService',
         function($scope, $location, $window, UserService, AuthenticationService,$ionicLoading,PopupService) {

        //Admin User Controller (signIn, logOut)
        $scope.signIn = function signIn(username, password) {
        	
            if (username != null && password != null) {
            	$ionicLoading.show({
                    template: '登录中...'
                });
                UserService.signIn(username, password).success(function(data) {
                	/*alert(data.success+data.message+name);*/
                	if(data.success){
                    AuthenticationService.isAuthenticated = true;
                    $window.sessionStorage.token = data.data;
                    $location.path("/app/positions");
                    $ionicLoading.hide();}
                    else{$ionicLoading.hide();
                    PopupService.showAlert("用户名或者密码错误");
             /*       AuthenticationService.isAuthenticated=true;
                    $window.sessionStorage.token="s";
                    $location.path("/app/positions");*/
                    }
                }).error(function(status, data) {
                	 $ionicLoading.hide();
//                    alert("无法连接服务");
                	 PopupService.showAlert("无法连接服务");   
                	/* AuthenticationService.isAuthenticated=true;
                     $window.sessionStorage.token="s";
                     $location.path("/app/positions");*/
                });
            }
        }

        $scope.logOut = function logOut() {
            if (AuthenticationService.isAuthenticated) {

                UserService.logOut().success(function(data) {
                    AuthenticationService.isAuthenticated = false;
                    delete $window.sessionStorage.token;
                    $location.path("/");
                }).error(function(status, data) {
                    console.log(status);
                    console.log(data);
                });
            }
            else {
                $location.path("/login");
            }
        }
        

       /* $scope.register = function register(username, password, passwordConfirm) {
            if (AuthenticationService.isAuthenticated) {
                $location.path("/admin");
            }
            else {
                UserService.register(username, password, passwordConfirm).success(function(data) {
                    $location.path("/admin/login");
                }).error(function(status, data) {
                    console.log(status);
                    console.log(data);
                });
            }
        }*/
    }
]);



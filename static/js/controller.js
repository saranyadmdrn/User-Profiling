angular.module('userApp').controller('RegisterController',['$cookies','$scope','$location','AuthService',
	function($cookies,$scope,$location,AuthService){
		$scope.register = function(){

			$scope.error = false

			AuthService.register($scope.registrationForm.name,$scope.registrationForm.password)

			.then(function (){
				$location.path('/login')
				$scope.registrationForm = {}
			})

			.catch(function(){
				$scope.error = true
				$scope.errorMessage = "User already exists"
				$scope.registrationForm = {}
			})
		}

    $scope.cancel =  function(){
      $location.path('/')
    }

    $scope.alreadyAnUser = function(){
      $location.path('/login')
    }
	}]);


angular.module('userApp').controller('LoginController',['$cookies','$scope', '$rootScope', '$location', 'AuthService',
  function ($cookies,$scope, $rootScope, $location, AuthService) {

    $scope.login = function () {

      	$scope.error = false

      	userProfile = AuthService.login($scope.loginForm.name, $scope.loginForm.password)
        


        .then(function (data) {
          //console.log(data)
          $cookies.login = 'loggedIn'
          $cookies.userName = $scope.loginForm.name
          $cookies.password = $scope.loginForm.password
          //console.log($cookies.userName)
          $cookies.userProfile = data
          $location.path('/home')
          $scope.loginForm = {}
        })
        
        .catch(function () {
          $scope.error = true;
          $scope.errorMessage = "Invalid username and/or password";
          $scope.loginForm = {};
        })
      

    }

}]);

angular.module('userApp').controller('HomeController',['$cookies','$scope', '$location', 'AuthService',
  function ($cookies,$scope, $location, AuthService) {
    //console.log("home page")
    if($cookies.login  == 'loggedIn'){
    	$scope.name = $cookies.userName
      $scope.details = $cookies.userProfile
    }
    else{
      //console.log("logged out")
      $location.path('/')
    }

    $scope.reasons = function(){
       if($cookies.login  == 'loggedIn'){
        $location.path('/reasons')
      }
    else{
      $location.path('/')
    }

    }

}]);

angular.module('userApp').controller('LogoutController',['$cookies','$window','$scope', '$location', 'AuthService',
  function ($cookies,$window,$scope, $location, AuthService) {
  	$scope.logout = function () {

      // call logout from service
      AuthService.logout($cookies.userName,$cookies.password)
        .then(function () {
          $cookies.login = 'loggedOut'
        	//console.log("navigate")
        	var cookies = $cookies.getAll();
          angular.forEach(cookies, function (v, k) {
            $cookies.remove(k);
          });
        	$scope.details = {}
          $location.path('/login');

        });

    };

    $scope.stackoverflow = function(){
    	$window.open('https://stackoverflow.com/questions/tagged/java?sort=frequent&pageSize=15', '_blank');
    }

}]);

angular.module('userApp').controller('UserLogController',['$cookies','$scope', '$location', 'AuthService',
  function ($cookies,$scope, $location, AuthService) {
     $scope.events = function () {
      if($cookies.login  == 'loggedIn'){
        $scope.name = $cookies.userName
        //console.log("nmaeeeeeee:"+$scope.name)
        AuthService.events($scope.name)
        


        .then(function (data) {
          //console.log(data)
          $cookies.userLog = data
          $location.path('/events')
        })
        .catch(function () {
          $scope.loginForm = {};
        })
      }
      else{
        $location.path('/')
      }

    }


    $scope.name = $cookies.userName
    $scope.userLog = $cookies.userLog

     $scope.back =  function(){
      $location.path('/home')
    }

}]);

angular.module('userApp').controller('ReasonsController',['$cookies','$scope', '$location', 'AuthService',
  function ($cookies,$scope, $location, AuthService) {
    $scope.reasons = function(){
       if($cookies.login  == 'loggedIn'){
        $location.path('/reasons')
      }
    else{
      $location.path('/')
    }

    }
    $scope.reasonsBack = function(){
       if($cookies.login  == 'loggedIn'){
        $location.path('/home')
      }
    else{
      $location.path('/')
    }

    }

}]);
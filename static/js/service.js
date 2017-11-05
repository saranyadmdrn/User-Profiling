angular.module('userApp').factory('AuthService', function ($q,$timeout,$http) {
	var savedData = {}, user = null
        return {
            register: function register(name,password){
	//$scope.error = false
				var deffered = $q.defer()
				$http.post('/register',{name:name,password:password})

				.success(function(data,status){
					if(status == 200 && data.result == 'success'){
						//$scope.error = true
						//$scope.errorMessage = "Registration successful"
						deffered.resolve()
					}
					else if(data.result == 'unsuccess'){
						//$scope.error = true
						//$scope.errorMessage = "User already exists"
						deffered.reject();
					}
				})

				.error(function(data){
					//$scope.error = true
					//$scope.errorMessage = "error"
					deffered.reject();
				})

				return deffered.promise
			},

			login : function login(name, password) {

			  var deferred = $q.defer();

			  $http.post('/login', {name: name, password: password})
			    
			    .success(function (data, status) {
			      if(status === 200 && data.result == 'success'){
			      	user = true 
			        deferred.resolve(data.json);
			        //return data.json
			      } 
			      else {
			      	user = false
			        deferred.reject();
			      }
			    })

			   /* .error(function (data) {

			      deferred.reject();
			    })*/

			  return deferred.promise;

			},
			events : function events(name) {

			  var deferred = $q.defer();
			  //console.log("events:" + name)
			  $http.post('/events', {name: name})
			    
			    .success(function (data, status) {
			    	//console.log(data)
			      if(status == 200 && data.result == 'success'){
			      	user = true 
			      	//console.log(data.json)
			        deferred.resolve(data.json);
			        //return data.json
			      } 
			      else {
			      	user = false
			        deferred.reject();
			      }
			    })

			   /* .error(function (data) {

			      deferred.reject();
			    })*/

			  return deferred.promise;

			},

			logout : function logout(name,password) {

						  
						  var deferred = $q.defer();

						  
						  $http.post('/logout', {name: name, password: password})
						   
						    .success(function (data) {
						    	user = false
						    		//console.log("resolve")				       
			        				deferred.resolve()
			    			})
						   
						    .error(function (data) {
						    	//console.log("no resolve")
						      user = false
						      deferred.reject();
						    });

						
						  return deferred.promise;

			},

			set : function set(data){
				savedData = data;
			},

			get : function get(data){
				return savedData;
			},

			getUserStatus : function getUserStatus(){
				return $http.get('/status')
				 
				  .success(function (data) {
				  	//console.log("success")
				    if(data.result == 'success'){
				      user = true;
				    } else {
				      user = false;
				    }
				  })
				  
				  .error(function (data) {
				    user = false;
				  });

			},

			isLoggedIn : function isLoggedIn(){
				if(user){
					return true
				}
				else{
					return false
				}
			},

			getAllTags : function getAllTags(){
				var deferred = $q.defer();
				$http.get('/getAllTags')
				.success(function(data,status){
					if(status == 200 && data.result == 'success'){
						deferred.resolve(data.json);
					}
					else{
						deferred.reject();
					}
				})

				return deferred.promise;

			},

			getTagChart : function getTagChart(name){
				var deferred = $q.defer();
				$http.get('/getTagChart',{name : name})
				.success(function(data,status){
					if(status == 200 && data.result == 'success'){
						//console.log(data.json);
						deferred.resolve(data.json);
					}
					else{
						deferred.reject();
					}
				})

				return deferred.promise;

			},

			getKeyWords : function getKeyWords(name){
				var deferred = $q.defer();
				//console.log(name);
				$http.get('/getKeyWords?name='+name)
				.success(function(data,status){
					if(status == 200 && data.result == 'success'){
						//console.log(data.json);
						deferred.resolve(data.json);
					}
					else{
						deferred.reject();
					}
				})

				return deferred.promise;
			},

			getAllKeyWords : function getAllKeyWords(){
				var deferred = $q.defer();
				$http.get('/getAllKeyWords?name='+name)
				.success(function(data,status){
					if(status == 200 && data.result == 'success'){
						//console.log(data.json);
						deferred.resolve(data.json);
					}
					else{
						deferred.reject();
					}
				})

				return deferred.promise;
			},
			getVotes : function getVotes(name){
				var deferred = $q.defer();
				$http.get('/getVotes?name='+name)
				.success(function(data,status){
					if(status == 200 && data.result == 'success'){
						//console.log(data.json);
						deferred.resolve(data.json);
					}
					else{
						deferred.reject();
					}
				})

				return deferred.promise;
			},

			getAllVotes : function getAllVotes(){
				var deferred = $q.defer();
				$http.get('/getAllVotes?name='+name)
				.success(function(data,status){
					if(status == 200 && data.result == 'success'){
						//console.log(data.json);
						deferred.resolve(data.json);
					}
					else{
						deferred.reject();
					}
				})

				return deferred.promise;
			},

			scrapy : function scrapy(){
				var deferred = $q.defer();
				$http.post('/scrapy')
				.success(function(data,status){
					if(status == 200 && data.result == 'success'){
						deferred.resolve(data.json);
					}
					else{
						deferred.reject();
					}
				})

				return deferred.promise;

			},

			indexToES : function indexToES(){
				var deferred = $q.defer();

			  $http.get('/indexToES')
			    
			    .success(function (data, status) {
			      if(status === 200 && data.result == 'success'){
			        deferred.resolve(data.json);
			      } 
			      else {
			        deferred.reject();
			      }
			    })
			  return deferred.promise;
			},

			search : function search(){
				var deferred = $q.defer(query);
			  $http.get('/search?query='+query)		    
			    .success(function (data, status) {
			      if(status === 200 && data.result == 'success'){
			      	//console.log(data.json);
			        deferred.resolve(data.json);
			      } 
			      else {
			        deferred.reject();
			      }
			    })
			  return deferred.promise;

			},




        }
    })

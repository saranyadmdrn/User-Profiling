//var myAppModule = angular.module('userApp');

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

     $scope.chart = function(){
       if($cookies.login  == 'loggedIn'){
        $location.path('/chart')
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


angular.module('userApp').controller('SocialController',['$cookies','$scope', '$location', 'AuthService',
  function ($cookies,$scope, $location, AuthService) {
    $scope.social = function(){
       if($cookies.login  == 'loggedIn'){
       // console.log($cookies.userName)
        $scope.name = $cookies.userName
        $location.path('/social')
      }
    else{
      $location.path('/')
    }

    }
    $scope.name = $cookies.userName
    $scope.back = function(){
       if($cookies.login  == 'loggedIn'){
        $location.path('/home')
      }
    else{
      $location.path('/')
    }

    }
    $scope.chart = function(){
       if($cookies.login  == 'loggedIn'){
        $location.path('/chart')
      }
    else{
      $location.path('/')
    }

    }
    $scope.keywords = function(){
       if($cookies.login  == 'loggedIn'){
        $location.path('/keywords')
      }
    else{
      $location.path('/')
    }

    }
    $scope.votes = function(){
       if($cookies.login  == 'loggedIn'){
        $location.path('/votes')
      }
    else{
      $location.path('/')
    }

    }


}]);


angular.module("userApp")
.config(['ChartJsProvider', function (ChartJsProvider) {
    // Configure all charts
    ChartJsProvider.setOptions({
      chartColors: ['#4dc9f6',
                '#f67019',
                '#f53794',
                '#537bc4',
                '#acc236',
                '#166a8f',
                '#00a950',
                '#58595b',
                '#8549ba'],
      responsive: true,
      legend:{ position: 'top', display : true},
      title : {
                display: true,
                text: 'No. of Tags'
              },
      scales: {
      xAxes: [{
        stacked: false,
        beginAtZero: true,
        ticks: {
            stepSize: 1,
            min: 0,
            autoSkip: false
        },
        scaleLabel : {
          display : true,
          labelString : "Tags"
        }
      }],
      yAxes : [{
        scaleLabel : {
          display : true,
          labelString : "No. of tags"
        }
      }]
    }
    });
    
  }])

.controller("ChartController",['$cookies','$scope', '$location','$modal', 'AuthService', 
  function ($cookies,$scope, $location,$modal, AuthService) {

    if($cookies.login == 'loggedIn'){
      $scope.name = $cookies.userName;
      $scope.TAGS = [];
      $scope.USERS = [];
      $scope.COUNTOFTAGS = [];
      $scope.count = [];
     
      AuthService.getTagChart($scope.name)
      .then(function (data){
        var data = JSON.parse(data);
       // console.log(data);
        for(var i in data){
          if(i == 'labels'){
            $scope.TAGS = data[i];
            //console.log($scope.TAGS);
          }
          else{
            $scope.USERS.push(i);
            $scope.COUNTOFTAGS.push(data[i]);
          }

        }
        $scope.count = angular.copy($scope.COUNTOFTAGS);
        if($scope.COUNTOFTAGS.length > 0){
          $scope.noTagsAlert = false
          $scope.drawChart($scope.TAGS,$scope.USERS,$scope.COUNTOFTAGS);
        }
        else{
          $scope.noTagsAlert = true
        }
        
        
      })
      .catch(function(){

      })
}
else{
   $location.path('/')
}
//    }

    window.chartColors = {
        red: 'rgb(255, 99, 132)',
        orange: 'rgb(255, 159, 64)',
        yellow: 'rgb(255, 205, 86)',
        green: 'rgb(75, 192, 192)',
        blue: 'rgb(54, 162, 235)',
        purple: 'rgb(153, 102, 255)',
        grey: 'rgb(201, 203, 207)'
    };
    var barChartData = [];

    var color = Chart.helpers.color;
    var colorNames = Object.keys(window.chartColors);
    $scope.drawChart = function(TAGS,USERS,COUNTOFTAGS){
    
      if(TAGS.length > 0){
        var label = []
        for(var i = 0 ; i < TAGS.length ; ++i){
          label.push(TAGS[i]);
          //console.log(labels[i]);
        }

       // console.log(label);
      }

      else{
        $scope.chartAlert = true
      }
      
      $scope.chartAlert = false

      datasets = []
      if(USERS.length > 0){
        for(var i = 0 ; i < USERS.length ; i++){
          dataset = [];
          if(USERS[i] == $cookies.userName){
            dataset['user'] = 'You';
          }
          else{
            dataset['user'] = USERS[i];

          }
          dataset['backgroundColor'] = color(window.chartColors[i]).alpha(0.5).rgbString();
          dataset['borderColor'] = window.chartColors[i];
          dataset['borderWidth'] = 1;
          dataset['data'] = COUNTOFTAGS[i];
         // console.log(dataset);
          datasets.push(dataset);
        }
      }

      else{
        //$scope.showUsers = true
      }

      //$scope.showUsers = false
      barChartData = {
          labels: [label[0],label[1],label[2],label[3],label[4],label[5],label[6]],
          datasets: datasets 
      };
          
      $scope.labels = barChartData.labels;
      series = []
      data = []
      for(var i = 0; i < barChartData.datasets.length ; i++){
       // console.log(barChartData.datasets[i].user);
        series.push(barChartData.datasets[i].user);
        data.push(barChartData.datasets[i].data)
      }
      $scope.series = series;
        //, barChartData.datasets[1].user];

      $scope.data = data;

    }
   

    $scope.$on('chart-create', function (evt, chart) {
    //  console.log(chart);
    });

    $scope.onClick = function (points, evt) {
   //   console.log(points, evt);
    };

    var colorNames = Object.keys(window.chartColors);
    $scope.addUser = function(){
      var colorName = colorNames[barChartData.datasets.length % colorNames.length];
      var dsColor = window.chartColors[colorName];
      var count = barChartData.datasets.length + 1;
      var length = barChartData.datasets.length;

      var newDataset = {
          user: 'User ' + count,
          backgroundColor: color(dsColor).alpha(0.5).rgbString(),
          borderColor: dsColor,
          borderWidth: 1,
          data: []
      };

      

      for (var index = 0; index < barChartData.labels.length; ++index) {
          newDataset.data.push(5+index);
      }
      barChartData.datasets.push(newDataset);

      $scope.series.push(newDataset.user);
      $scope.data.push(newDataset.data);
        
  };

  $scope.removeUser = function(){
      barChartData.datasets.splice(-1,1);
      $scope.series.splice(-1,1);
      $scope.data.splice(-1,1);
  };

  
  $scope.addTag = function(){
      //tagCount = tagCount - 1;
      var TAGS = $scope.TAGS;
      
     // console.log(TAGS)
     // console.log($scope.count)

      if(barChartData.datasets.length > 0){
          if(barChartData.labels.length != TAGS.length){
          
         // console.log(barChartData.labels.length)
         // console.log(TAGS.length)

          var tag = TAGS[barChartData.labels.length % TAGS.length];

          barChartData.labels.push(tag);

          for(var i = 0 ; i < barChartData.datasets.length; ++i){
          
            barChartData.datasets[i].data = $scope.count[i];
          }
        }

        else{
          $scope.chartAlert = true;
        }
      }
  };

  $scope.removeTag = function(){
      $scope.chartAlert = false;
      barChartData.labels.splice(-1,1);
      barChartData.datasets.forEach(function(dataset, datasetIndex) {          
            dataset.data.splice(-1,1);
            //console.log(newDataset)
      });

  };

  $scope.open = function () {
var modalInstance = $modal.open({
templateUrl: 'static/templates/popup.html',
controller: 'PopupController'
});
}

 $scope.back =  function(){
      $location.path('/social')
    }

}]);


angular.module('userApp').controller('PopupController', ['$scope','$modalInstance',function ($scope, $modalInstance) {
$scope.close = function () {
$modalInstance.dismiss('cancel');
};
}]);


angular.module("userApp")
.config(['ChartJsProvider', function (ChartJsProvider) {
    // Configure all charts
    ChartJsProvider.setOptions({
      chartColors: ['#4dc9f6',
                '#f67019',
                '#f53794',
                '#537bc4',
                '#acc236',
                '#166a8f',
                '#00a950',
                '#58595b',
                '#8549ba'],
      responsive: true,
      legend:{ position: 'top', display : true}
    });
    
  }])

.controller("KeywordsController",['$cookies','$scope', '$location','$modal', 'AuthService', 
  function ($cookies,$scope, $location,$modal, AuthService) {

    if($cookies.login == 'loggedIn'){
      $scope.name = $cookies.userName;
      labels = []
      scores = []

      allLabels = []
      allScores = []

      AuthService.getKeyWords($scope.name)

      .then(function (data){
        //console.log(data);
        for(var i in data){
          //console.log(data[i])
          labels.push(i);
          scores.push(data[i]);
        }

        if(labels.length > 0){
          $scope.noLabelsAlert = false
          $scope.drawChart(labels, scores);
        }
        else{
          $scope.noLabelsAlert = true
        }
        
      })
      .catch(function(){

      })


      AuthService.getAllKeyWords($scope.name)

      .then(function (data){
        //console.log(data);
        for(var i in data){
          //console.log(data[i])
          allLabels.push(i);
          allScores.push(data[i]);
        }
        if(allLabels.length > 0){
          $scope.noAllLabelsAlert = false
          $scope.drawAllChart(allLabels, allScores);
        }
        else{
          $scope.noAllLabelsAlert = true
        }
        
      })
      .catch(function(){

      })
    }
    else{
      $location.path('/')
    }


    $scope.$on('chart-create', function (evt, chart) {
    //  console.log(chart);
    });

    $scope.onClick = function (points, evt) {
      //console.log(points, evt);
    };

    window.chartColors = {
        red: 'rgb(255, 99, 132)',
        orange: 'rgb(255, 159, 64)',
        yellow: 'rgb(255, 205, 86)',
        green: 'rgb(75, 192, 192)',
        blue: 'rgb(54, 162, 235)',
        purple: 'rgb(153, 102, 255)',
        grey: 'rgb(201, 203, 207)'
    };

    chartColors: ['#4dc9f6',
                '#f67019',
                '#f53794',
                '#537bc4',
                '#acc236',
                '#166a8f',
                '#00a950',
                '#58595b',
                '#8549ba']
    

    var color = Chart.helpers.color;
    var doughnutChart = []

    $scope.drawChart = function(labels,scores){

      //datasets = []

      //if(USERS.length > 0){
        data = []
        backgroundColor = []
        //dataset = []
        for(var i = 0 ; i < scores.length ; i++){

          data.push(scores[i]);
          backgroundColor.push(chartColors[i]);

        }
        
      //data = []
       $scope.labels = labels;
       $scope.data = data;
       $scope.Color= backgroundColor;
      
        $scope.options = {
             title :{display :true,
              text : "Most searched keyword"},
              tooltips: {
                mode: 'label',
                callbacks: {
                    label: function(tooltipItem, data) {
                        return data['datasets'][0]['data'][tooltipItem['index']] + '%';
                    }
                }
            },
             responsive:true,
                    
                    scales: {
                        xAxes: [{
                            display: this.scalesdisplay,
                            ticks: {
                                beginAtZero:this.beginzero
                            }
                        }],
                        yAxes: [{
                            display: this.scalesdisplay,
                            ticks: {
                                beginAtZero:this.beginzero
                            }
                        }]
                      }
        }

    }



    $scope.drawAllChart = function(labels,scores){

      //datasets = []

      //if(USERS.length > 0){
        data = []
        backgroundColor = []
        //dataset = []
        for(var i = 0 ; i < scores.length ; i++){

          data.push(scores[i]);
          backgroundColor.push(chartColors[i]);

        }
        
      //data = []
       $scope.allLabels = labels;
       $scope.allData = data;
       $scope.allColor= backgroundColor;
      // $scope.allTitle = "sample hkhfdhfkdhfhdkfhdskfhkdhk"
    
        $scope.allOptions = {
          title :{display :true,
              text : "Most searched keyword by other users"},
             responsive:true,
             tooltips: {
                mode: 'label',
                callbacks: {
                    label: function(tooltipItem, data) {
                        return data['datasets'][0]['data'][tooltipItem['index']] + '%';
                    }
                }
            },
                    
                    scales: {
                        xAxes: [{
                            display: this.scalesdisplay,
                            ticks: {
                                beginAtZero:this.beginzero,
                            }
                        }],
                        yAxes: [{
                            display: this.scalesdisplay,
                            ticks: {
                                beginAtZero:this.beginzero,
                            }
                        }]
                      }
        }
 
    

  }

$scope.open = function () {
var modalInstance = $modal.open({
templateUrl: 'static/templates/keywordPopup.html',
controller: 'PopupController'
});
}

  $scope.back =  function(){
      $location.path('/social')
    }

}]);

angular.module("userApp")
.config(['ChartJsProvider', function (ChartJsProvider) {
    // Configure all charts
    ChartJsProvider.setOptions({
      chartColors: ['#4dc9f6',
                '#f67019',
                '#f53794',
                '#537bc4',
                '#acc236',
                '#166a8f',
                '#00a950',
                '#58595b',
                '#8549ba'],
      responsive: true,
      legend:{ position: 'top', display : true}
    });
    
  }])

.controller("VotesController",['$cookies','$scope', '$location','$modal', 'AuthService', 
  function ($cookies,$scope, $location,$modal, AuthService) {
    if($cookies.login == 'loggedIn'){
      $scope.name = $cookies.userName;
      labels = []
      votes = []

      allLabels = []
      allVotes = []

      AuthService.getVotes($scope.name)

      .then(function (data){
        //console.log(data);
        for(var i in data){
          //console.log(data[i])
          labels.push(i);
          votes.push(data[i]);
        }
        if(labels.length > 0){
          $scope.noVotesAlert = false
          $scope.drawChart(labels, votes);
        }
        else{
            $scope.noVotesAlert = true
        }
      })
      .catch(function(){

      })


      AuthService.getAllVotes($scope.name)

     .then(function (data){
        //console.log(data);
        for(var i in data){
          //console.log(data[i])
          allLabels.push(i);
          allVotes.push(data[i]);
        }
        if(allLabels.length > 0){
          $scope.noAllVotesAlert = false
          $scope.drawAllChart(allLabels, allVotes);
        }
        else{
          $scope.noAllVotesAlert = true
        }
        
      })
      .catch(function(){

      })
    }

    else{
      $location.path('/')
    }

    $scope.$on('chart-create', function (evt, chart) {
     // console.log(chart);
    });

    $scope.onClick = function (points, evt) {
    //  console.log(points, evt);
    };

    window.chartColors = {
        red: 'rgb(255, 99, 132)',
        orange: 'rgb(255, 159, 64)',
        yellow: 'rgb(255, 205, 86)',
        green: 'rgb(75, 192, 192)',
        blue: 'rgb(54, 162, 235)',
        purple: 'rgb(153, 102, 255)',
        grey: 'rgb(201, 203, 207)'
    };

    chartColors: ['#4dc9f6',
                '#f67019',
                '#f53794',
                '#537bc4',
                '#acc236',
                '#166a8f',
                '#00a950',
                '#58595b',
                '#8549ba']
    

    var color = Chart.helpers.color;
    var doughnutChart = []

    $scope.drawChart = function(labels,votes){

      //datasets = []

      //if(USERS.length > 0){
        data = []
        backgroundColor = []
        //dataset = []
        for(var i = 0 ; i < votes.length ; i++){

          data.push(votes[i]);
          backgroundColor.push(chartColors[i]);

        }
        
      //data = []
       $scope.labels = labels;
       $scope.data = data;
       $scope.Color= backgroundColor;
      
        $scope.options = {
             title :{display :true,
              text : "Votes for questions/answers"},
             responsive:true,
                    
                    scales: {
                        xAxes: [{
                            display: this.scalesdisplay,
                            ticks: {
                                beginAtZero:this.beginzero
                            }
                        }],
                        yAxes: [{
                            display: this.scalesdisplay,
                            ticks: {
                                beginAtZero:this.beginzero
                            }
                        }]
                      }
        }

    }



    $scope.drawAllChart = function(labels,votes){

      //datasets = []

      //if(USERS.length > 0){
        data = []
        backgroundColor = []
        //dataset = []
        for(var i = 0 ; i < votes.length ; i++){

          data.push(votes[i]);
          backgroundColor.push(chartColors[i]);

        }
        
      //data = []
       $scope.allLabels = labels;
       $scope.allData = data;
       $scope.allColor= backgroundColor;
      // $scope.allTitle = "sample hkhfdhfkdhfhdkfhdskfhkdhk"
    
        $scope.allOptions = {
          title :{display :true,
              text : "Votes for questions/answers by other users"},
             responsive:true,                   
                    scales: {
                        xAxes: [{
                            display: this.scalesdisplay,
                            ticks: {
                                beginAtZero:this.beginzero,
                            }
                        }],
                        yAxes: [{
                            display: this.scalesdisplay,
                            ticks: {
                                beginAtZero:this.beginzero,
                            }
                        }]
                      }
        }

  }

  $scope.open = function () {
    var modalInstance = $modal.open({
      templateUrl: 'static/templates/votesPopup.html',
      controller: 'PopupController'
    });
  }

  $scope.back =  function(){
      $location.path('/social')
  }


}]);
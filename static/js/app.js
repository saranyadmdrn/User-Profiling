var app = angular.module("userApp", ["ngRoute","ngCookies","chart.js","ui.bootstrap"]);
    app.config(function($routeProvider) {
        $routeProvider
        .when("/", {
            templateUrl : "static/templates/main.html"
        })
        .when("/login", {
            templateUrl : "static/templates/login.html",
            controller: "LoginController"
        })
        .when("/register", {
            templateUrl : "static/templates/register.html",
            controller: "RegisterController"
        })
        .when("/home", {
            templateUrl : "static/templates/home.html",
            controller: "HomeController"
        })
        .when("/events", {
            templateUrl : "static/templates/events.html",
            controller: "UserLogController"
        })
        .when("/reasons", {
            templateUrl : "static/templates/reasons.html",
            controller: "ReasonsController"
        })
        .when("/chart", {
            templateUrl : "static/templates/chart.html",
            controller: "ChartController"
        })
        .when("/keywords", {
            templateUrl : "static/templates/keywords.html",
            controller: "KeywordsController"
        })
        .when("/votes", {
            templateUrl : "static/templates/votes.html",
            controller: "VotesController"
        })
        .when("/social", {
            templateUrl : "static/templates/social.html",
            controller: "SocialController"
        })
        .when("/search", {
            templateUrl : "static/templates/search.html",
            controller: "SearchController"
        })      
      
    });
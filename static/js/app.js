var app = angular.module("userApp", ["ngRoute","ngCookies"]);
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


      
    });
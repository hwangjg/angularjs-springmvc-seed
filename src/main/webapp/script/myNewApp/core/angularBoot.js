"use strict";

var myNewApp = angular.module("myNewAppModule", ["ngRoute", "ngResource"])
	.config(["$routeProvider", function($routeProvider) {
		return $routeProvider.when("/list", {
			templateUrl: "html/userList.html",
			controller: "UserListController"
		}).when("/edit/:id", {
			templateUrl: "html/userEdit.html",
			controller: "UserEditController"
		}).when("/edit", {
			templateUrl: "html/userEdit.html",
			controller: "UserEditController"
		}).otherwise({
			redirectTo: "/list"
		});
	}]);










"use strict";

myNewApp.controller("UserEditController", ["$scope", "$location", "$routeParams", "UserResource", function ($scope, $location, $routeParams, UserResource) {

	if (typeof $routeParams.id !== "undefined") {
		$scope.user = UserResource.get({id: $routeParams.id})
	} else {
		$scope.user = new UserResource();
	}

	function backToUserList() {
		$location.path("/list");
	}

	function saveOrUpdate() {
		if ($scope.user.isNew()) {
			$scope.user.$save(function () {
				$location.path("/list");
			});
		} else {
			$scope.user.$update(function() {
				$location.path("/list");
			});
		}
	}

	$scope.backToUserList = backToUserList;
	$scope.saveOrUpdate = saveOrUpdate;
}]);
"use strict";

myNewApp.controller("UserListController", ["$scope", "$location", "UserResource", function ($scope, $location, UserResource) {

	function editUser(userId) {
		$location.path("/edit/" + userId);
	}

	function deleteUser(userId) {
		var userIdToDelete;
		$scope.users.forEach(function (user, userArrayIndex) {
			if (user.id === userId) {
				user.$delete();
				userIdToDelete = userArrayIndex;
			}
		});
		$scope.users.splice(userIdToDelete, 1);
	}

	function newUser() {
		$location.path("/edit");
	}

	$scope.editUser = editUser;
	$scope.deleteUser = deleteUser;
	$scope.newUser = newUser;
	$scope.users = UserResource.query();

}]);

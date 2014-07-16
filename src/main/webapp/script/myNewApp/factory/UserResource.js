"use strict";

myNewApp.factory("UserResource", ["$resource", function ($resource) {

	var UserResource = $resource("users/:id", {id: "@id"}, {update: {method: "PUT"}});

	UserResource.prototype.isNew = function(){
		return (typeof(this.id) === "undefined");
	}

	return UserResource;
}]);
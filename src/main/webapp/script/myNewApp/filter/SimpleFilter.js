"use strict";

myNewApp.filter("SimpleFilter", function () {
	return function (input, separator) {
		var separator = separator || "\"";
		if (angular.isDefined(input)) {
			return separator + input + separator;
		}
	}
});



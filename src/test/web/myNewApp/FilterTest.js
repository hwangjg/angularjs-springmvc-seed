"use strict";

describe("Filters - ", function() {
	var simpleFilter;

	beforeEach(function () {
		module("myNewAppModule");
		inject(function ($filter) {
			simpleFilter = $filter("SimpleFilter");
		});
	});

	it('should SimpleFilter works ', function () {
		expect(simpleFilter).toBeDefined();
		expect(simpleFilter("text", "!")).toEqual("!text!");
		expect(simpleFilter("0", "x")).toEqual("x0x");
		expect(simpleFilter("0")).toEqual("\"0\"");

		expect(simpleFilter(null)).toEqual("\"null\"");
		expect(simpleFilter()).toEqual(undefined);
	});
});


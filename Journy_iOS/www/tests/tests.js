var Tests = {};
Tests.finishTests = function() {
	QUnit.done(function(details) {
		console.log( "Total: ", details.total, " Failed: ", details.failed, " Passed: ", details.passed, " Runtime: ", details.runtime );
	});
};

Tests.runHomeTests = function() {
	test("Homescreen", function() {
		// collection namespace exists
		ok(MOB.Journy.Collections);
		// journy collection instance exists
		ok(MOB.Journy.Collections.journys);
		// model namespace exists
		ok(MOB.Journy.Models);
		// journy model instance
		ok(MOB.Journy.mJourny);
		// view namespace exists
		ok(MOB.Journy.Views);
		// journy view instance exists
		ok(MOB.Journy.vPgHome);
		// journy view instance has been rendered
		ok(MOB.Journy.Views.pgHome.$el);

		//collection on homescreen
		ok(MOB.Journy.Collections.journys.length);
	});
};

Tests.runJournyTests = function() {
	test("Timeline View", function() {
		// collection namespace exists
		ok(MOB.Journy.Collections);
		// entries collection namespace exists
		ok(MOB.Journy.cEntries);
		// filtered picture instance exists
		ok(MOB.Journy.cFilteredPictures);

		//make sure definitions exist
		ok(MOB.Journy.cJournys);
		ok(MOB.Journy.cMapCoords);
	});
};

Tests.checkPgJournyEntry = function() {
	test("check if journy entry page is fine.", function() {
		ok(location.hash.indexOf("#journy/") != -1, "Hash is correct");

		ok(!_.isEmpty(MOB.Journy.Models) && MOB.Journy.Models.currentJourny, "There is a model.");
		ok(MOB.Journy.Models.currentJourny.get("name"), "The model has a name and therefore can be used.");

		ok(MOB.Journy.Views.vPgJournyEntries, "View exists");

		ok($("#dPgEntry"), "Page exists");
		ok($("#dPgEntry:visible"), "Page is visible");
		ok($("#dHeader"), "Page exists");
		ok($("#dHeader:visible"), "Header is visible");
		ok($("#dEntryOverview"), "Overview exists");
		ok($("#dEntryOverview:visible"), "Overview is visible");
	});
};

Tests.checkPgJournyEntriesList = function() {
	test("check if journy entry list is fine.", function() {
		var locHash = location.hash;
		ok((locHash.indexOf("#journy/") != -1 && locHash.indexOf("/list") != -1), "Hash is correct");

		ok(MOB.Journy.Collections.journyEntries, "There is a collection to use.");
		ok(MOB.Journy.Collections.filteredPictures, "Filtered collections exist.");
		ok(MOB.Journy.Collections.mapCoords, "Map coordinates collections exist.");
		ok(_.filter(MOB.Journy.Collections.journyEntries, function(entry) {
			return !entry.get("name") && !entry.get("datetime");
		}), "There is a collection to use.");
		ok(MOB.Journy.Views.vPgJournyEntriesList, "View exists");

		ok($("#dHeader"), "Page exists");
		ok($("#dHeader:visible"), "Header is visible");
		ok($("#dJournyEntriesList"), "Timeline exists");
		ok($("#dJournyEntriesList:visible"), "Timeline is visible");
	});
};
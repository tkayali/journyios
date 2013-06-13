// Namespaces
var MOB = {};
MOB.Journy = {};
MOB.Journy.Views = {};
MOB.Journy.Collections = {};
MOB.Journy.Models = {};
MOB.Journy.Router = {};
MOB.Journy.TemplateCache = {};
MOB.Utils = {};
MOB.Journy.Utils = {};

$(document).ready(function() {
	// // run tests
	// Tests.runTests();
	// // display output from tests

	MOB.Journy.Router = new MOB.JournyRouter();
	Backbone.history.start();
});

$(document).on("click", "a.route", function(e) {
	MOB.Journy.Router.navigate($(this).attr("href"), {
		trigger: true
	});

	return false;
});

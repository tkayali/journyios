MOB.Journy.cJournys = Backbone.Collection.extend({
	model: MOB.Journy.mJourny
});

MOB.Journy.cEntries = Backbone.Collection.extend({
	model: MOB.Journy.mEntry
});

MOB.Journy.cFilteredPictures = Backbone.Collection.extend({
	model: MOB.Journy.mEntry
});

MOB.Journy.cMapCoords = Backbone.Collection.extend({
	model: MOB.Journy.mEntry
});
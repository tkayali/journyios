MOB.JournyRouter = Backbone.Router.extend({
	history: [],

	routes: {
		'': 'overview',
		'create/': 'create',
		'journy/:journyId': 'journy',
		'journy/:journyId/timeline': 'timeline',
		'journy/:journyId/edit': 'edit',
		'*notFound': 'notFound'
	},

	initialize: function() {
		this.on('route', this.saveHistory, this);
		this.on('router:goBack', this.goBack, this);
		console.log('router is initialized');
	},

	overview: function() {
		this.firstPage = true; //fix that

		// console.log('home is loading');
		MOB.Journy.Views.pgHome = new MOB.Journy.vPgHome();

		this.showPage(MOB.Journy.Views.pgHome);
	},

	journy: function(journyId) {
		// console.log('weve gone ahead and gotten this id', Id);
		MOB.Journy.Views.pgJourny = new MOB.Journy.vPgJourny({'journyId': journyId});

		this.showPage(MOB.Journy.Views.pgJourny);
	},

	timeline: function(journyId) {
		MOB.Journy.Views.pgTimeline = new MOB.Journy.vPgTimeline({'journyId': journyId});

		this.showPage(MOB.Journy.Views.pgTimeline);
	},

	timelineEvent: function(journyId, eventID) {
		MOB.Journy.Views.pgTimelineEvent = new MOB.Journy.vPgTimelineEvent({'journyId': journyId, 'eventId': eventID});

		this.showPage(MOB.Journy.Views.pgTimelineEvent);
	},

	edit: function(journyId) {
		MOB.Journy.Views.vPgEditCreate = new MOB.Journy.vPgEditCreate({
			'journyId': journyId,
			edit: true
		});

		this.showPage(MOB.Journy.Views.vPgEditCreate)
	},

	create: function() {
		MOB.Journy.Views.vPgEditCreate = new MOB.Journy.vPgEditCreate();

		this.showPage(MOB.Journy.Views.vPgEditCreate)
	},

	showPage: function(view) { //needs refactoring.
        var transition = $.mobile.defaultPageTransition;
        $('body').append(view.el);

  		// // We don't want to slide the first page
        if (this.firstPage) {
            transition = 'none';
            this.firstPage = false;
        }

        $.mobile.changePage($(view.el), {changeHash : false, transition : transition});
    },

    saveHistory: function() {
    	if (this.history[this.history.length - 1] == Backbone.history.fragment) {
    		return false;
    	}

    	this.history.push(Backbone.history.fragment);
    },

    goBack: function() {
    	// console.warn(this.history);

    	this.history.pop(); //will lose forward
    	this.navigate(this.history[this.history.length - 1], {
    		trigger: true //make it change the page
    	});

    	// console.warn(this.history);
    }
});

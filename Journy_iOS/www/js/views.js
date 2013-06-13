/*
 * Template Cache
 */
MOB.TemplateCache = MOB.TemplateCache || {
	get: function(tmplSelector, force) {
		var data = data || {},
		force = force || false;

		MOB.templateCache = MOB.templateCache || {};

		if (MOB.templateCache[tmplSelector] && !force) {
			return MOB.templateCache[tmplSelector];
		}

		var tmplHtml = $('#' + tmplSelector).html(),
		template = _.template(tmplHtml);

		MOB.templateCache[tmplSelector] = template;
		return template;
	}
};


MOB.Journy.vPgHome = Backbone.View.extend({
	attributes: {'data-role': 'page'},
	events: {
		'taphold .editable': 'showEditPrompt'
	},

	initialize: function() {
		// console.log('home is running');
		this.haveJournys = this.getJournys();
		this.render();

		console.group("testing for home page");
		Tests.runHomeTests();
		Tests.finishTests();
		console.groupEnd();
	},

	render: function() {
		var template = MOB.TemplateCache.get('tmplHome');
		tmplHtml = template();
		this.$el.html(tmplHtml);

		if (this.haveJournys) {
			this.populateJournys();
		}

		this.headerView = new MOB.Journy.vHeader({
			tmplId: 'tmplHeaderHome',
			contentId: "dHomeContent",
			$pageEl: this.$el
		});

		// console.log('home is done rendering?', this.el);
		return this;
	},

	getJournys: function() { //should this use the cache? for now, idc
		var journys = MOB.Journy.Services.getJourny(); //populate the global object

		if (!MOB.Journy.Data.userJournys) {
			console.warn('service errors, bro?');
			return false
		} else if (!MOB.Journy.Collections.journys) {
			MOB.Journy.Collections.journys = new MOB.Journy.cJournys(MOB.Journy.Data.userJournys);
		}

		return true;
	},

	populateJournys: function() {
		var listHtml = [],
			template,
			renderedTemplate;

		if (MOB.Journy.Collections && MOB.Journy.Data.userJournys) {
			MOB.Journy.Collections.journys.each(function(journy, index) {
				template = MOB.TemplateCache.get('tmplHomeRow');
				renderedTemplate = template({journy: journy});

				listHtml.push(renderedTemplate);
			});
		}

		this.$el.find('#dHomeList').html(listHtml);
	},

	showEditPrompt: function(ev) {
		var $elem = $(ev.currentTarget);

		MOB.Journy.Router.navigate('journy/' + $elem.attr('data-journy-id') + '/edit', {
			trigger: true
		});
	}
});




MOB.Journy.vPgJourny = Backbone.View.extend({
	attributes: {'data-role': 'page'},
	events: {},

	initialize: function() {
		this.journyId = this.options.journyId;
		this.render();

		console.group("testing for journy page");
		Tests.runJournyTests();
		Tests.finishTests();
		console.groupEnd();
	},

	render: function() {
		console.warn(MOB.Journy.Collections.journys.get(this.journyId));

		var template = MOB.TemplateCache.get('tmplJourny'),
			journy = MOB.Journy.Collections.journys.get(this.journyId);

		tmplHtml = template({journy: journy});
		this.$el.html(tmplHtml);

		this.headerView = new MOB.Journy.vHeader({
			tmplId: 'tmplHeaderJourny',
			contentId: 'dJournyContent',
			data: {journy: journy},
			$pageEl: this.$el
		});

		// console.log('journy is done rendering...');
		return this;
	}
});




MOB.Journy.vHeader = Backbone.View.extend({
	attributes: {'data-role': 'header'},

	events: {
		'click .back': 'goBack'
	},

	initialize: function() {
		this.tmplId = this.options.tmplId;
		this.headerTitle = this.options.headerTitle;
		this.contentId = this.options.contentId;
		this.data = this.options.data;
		this.$pageEl = this.options.$pageEl;

		// console.log('header is running');
		this.render();
	},

	render: function() {
		var template = MOB.TemplateCache.get(this.tmplId),
			renderedTemplate = template(this.data),
			$headerHtml = $(renderedTemplate);

		this.$el.append($headerHtml);

		$('#' + this.contentId).prepend(this.el);
		this.$pageEl.prepend(this.$el);

		// console.warn('header is done rendering');

		return this;
	},

	goBack: function(ev) {
		ev.preventDefault(); //ignore the href

		MOB.Journy.Router.trigger('router:goBack');
	}
});




MOB.Journy.vPgTimeline = Backbone.View.extend({
	attributes: {'data-role': 'page'},
	events: {},

	initialize: function() {
		this.journyId = this.options.journyId;
		this.haveEntries = this.getEntries(this.journyId);
		this.render();
	},

	render: function() {
		var template = MOB.TemplateCache.get('tmplTimeline'),
				journy = MOB.Journy.Collections.journys.get(this.journyId),
				entries = MOB.Journy.Collections.userEntries;

		tmplHtml = template({journy: journy, entries : entries});
		this.$el.html(tmplHtml);

		if (this.haveEntries) {
			this.populateEntries();
		}

		this.headerView = new MOB.Journy.vHeader({
			tmplId: 'tmplHeaderTimeline',
			contentId: 'dTimelineContent',
			data: {journy: journy},
			$pageEl: this.$el
		});

		return this;
	},

	getEntries: function(journyID) {
		// go out and grab events for the journy
		var entries = MOB.Journy.Services.getEntries(journyID);

		if (MOB.Journy.Data.userEntries) {
			MOB.Journy.Collections.userEntries = new MOB.Journy.cEntries(MOB.Journy.Data.userEntries);
			return true;
		}

		return false;
	},

	populateEntries: function() {
		var listHtml = [],
				template,
				renderedTemplate,
				journyId = this.journyId;

		if (MOB.Journy.Collections.userEntries && MOB.Journy.Data.userEntries) {
			MOB.Journy.Collections.userEntries.each(function(entry, index) {
				template = MOB.TemplateCache.get('tmplTimelineRow');
				renderedTemplate = template({journyId : journyId, entry : entry});

				listHtml.push(renderedTemplate);
			});
		}

		console.log(this.$el.find('#dTimelineList'));
		this.$el.find('#dTimelineList').html(listHtml);
	}
});

MOB.Journy.vPgEditCreate = Backbone.View.extend({
	attributes: {'data-role': 'page'},
	events: {
		'click #saveJourny': 'save'
	},

	initialize: function() {
		this.journyId = this.options.journyId;
		this.edit = this.options.edit;

		// console.log('home is running');
		this.render();
	},

	render: function() {
		var template = MOB.TemplateCache.get('tmplEdit');
		tmplHtml = template({val: MOB.Journy.Collections.journys.get(this.journyId)});
		this.$el.html(tmplHtml);

		this.headerView = new MOB.Journy.vHeader({
			tmplId: 'tmplHeaderEdit',
			contentId: 'dEditContent',
			data: {edit: this.edit},
			$pageEl: this.$el
		});

		// console.log('home is done rendering?', this.el);
		return this;
	},

	save: function() {

		if (this.journyId) { //then we know this has to do with edit
			var editedName = $('#editedName').val();
			MOB.Journy.Collections.journys.get(this.journyId).set('name', editedName);
			console.warn(MOB.Journy.Collections.journys);
		} else {
			var newName = $('#newName').val();
			MOB.Journy.Collections.journys.add({
				'id': -1,
				'name': newName,
				'description': ''
			});
		}

		MOB.Journy.Router.trigger('router:goBack');
	}
});

$(document).bind('mobileinit', function() {
	$.mobile.ajaxEnabled = false;
	$.mobile.linkBindingEnabled = false;
	$.mobile.hashListeningEnabled = false;
	$.mobile.pushStateEnabled = false;

	// Remove page from DOM when it’s being replaced
	$(document).on("div[data-role='page']","pagehide", function (event, ui) {
		$(event.currentTarget).remove();
		$(event.currentTarget).close();
	});
});
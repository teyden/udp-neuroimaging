var editableCell = function($el) {
	this.$el = $($el);
	this.noteContent = '';
	this.initChooseOne();
	this.initHasSelected();
	this.startup();
};

editableCell.prototype.initChooseOne = function() {
	this.$el.on('click', 'input[type=checkbox].choose-one', function(e) {
		$(e.target).closest('td').find('input[type=checkbox]').filter(function() {
			return this != e.target;
		}).prop('checked', false);
	});
}

editableCell.prototype.initHasSelected = function() {
	this.$el.on('click', 'input[type=checkbox]', (function(e) {
		this.$el.toggleClass('has-selected', $(e.target).is(':checked'));
	}).bind(this));
}

editableCell.prototype.onenternoNote = function(event, from, to) {
	var $buttonCtr = $('<p class="add-note active"><button>+ Add note</button></p>');
	this.$el.append($buttonCtr);
	var $button = $buttonCtr.find('button');

	this.initPopoverWithTrigger($button);
}
editableCell.prototype.onleavenoNote = function(event, from, to) {
	this.$popoverTrigger.popover('destroy');
	$('p.add-note', this.$el).remove();
}
editableCell.prototype.onenterhasNote = function(event, from, to) {
	var $note = $('<p class="note"><span class="content"></span></p>');
	$('span.content', $note).text(this.noteContent);

	var $button = $('<button><i class="fa fa-pencil"></i></button>');
	$note.append($button);

	this.initPopoverWithTrigger($button);

	this.$el.append($note);
}
editableCell.prototype.onleavehasNote = function(event, from, to) {
	this.$popoverTrigger.popover('destroy');
	$('p.note', this.$el).remove();
}

editableCell.prototype.initPopoverWithTrigger = function($trigger) {
	var $textarea = $('<textarea></textarea>');
	$textarea.val(this.noteContent);
	$textarea.bind('blur', function() {
		$trigger.popover('hide');
	});
	$trigger.on('shown.bs.popover', function() {
	  $textarea.focus();
	})
	$trigger.popover({
		content: $textarea,
		html: true,
		template: '<div class="popover" role="tooltip"><div class="arrow"></div><div class="popover-content"></div></div>',
		trigger: 'manual',
		container: this.$el
	});
	$trigger.on('hidden.bs.popover', (function() {
		this.noteContent = this.getPopoverEditorVal();
		this.updateDisplayedNote();

		if (!this.noteContent.length && this.current != "noNote") {
			this.removeNote();
		} else if (this.noteContent.length && this.current != "hasNote") {
			this.addNote();
		}
	}).bind(this));
	$trigger.bind('click', function() {
		$trigger.popover('show');
	});
	this.popover = $trigger.data('bs.popover');
	this.$popoverTrigger = $trigger;
}

editableCell.prototype.getPopoverEditorVal = function() {
	return this.popover.$tip.find('textarea').val();
}

editableCell.prototype.setPopoverEditorVal = function(val) {
	this.popover.$tip.find('textarea').val(val);
}

editableCell.prototype.updateDisplayedNote = function() {
	this.$el.find('.note .content').text(this.noteContent);
}

StateMachine.create({
	target: editableCell.prototype,
	events: [
		{ name: 'startup',  from: 'none',  to: 'noNote' },
		{ name: 'addNote',  from: 'noNote',  to: 'hasNote' },
		{ name: 'removeNote', from: 'hasNote', to: 'noNote' },
	],
});

$('td').filter(function() {
	return $(this).children().length;
}).each(function() {
	new editableCell(this);
})
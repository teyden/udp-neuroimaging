window.NeurologyTable.Section.Row.Cell.Note = React.createClass({
	displayName: "Note",

	onTextAreaKeypress: function(e) {
		if (e.charCode == 13) {
			e.preventDefault();
			this.refs.popoverTrigger.hide();
		}
	},

	onPopoverReady: function() {
		this.refs.noteField.focus();
	},

	// source: http://stackoverflow.com/questions/4715762/javascript-move-caret-to-last-character
	moveCaretToEnd: function(el) {
		if (typeof el.selectionStart == "number") {
			el.selectionStart = el.selectionEnd = el.value.length;
		} else if (typeof el.createTextRange != "undefined") {
			el.focus();
			var range = el.createTextRange();
			range.collapse(false);
			range.select();
		}
	},

	onTextAreaFocus: function(e) {
		this.moveCaretToEnd(e.target);
	},

	onPopoverHide: function() {
		this.props.onNoteChange(this.refs.noteField.value);
	},

	render: function () {
		if (!this.props.note) {
			var currentNote = null;
			var trigger = React.createElement(
				"button",
				{ className: "add" },
				"+ Add note"
			);
		} else {
			var currentNote = React.createElement(
				"span",
				{ className: "content" },
				this.props.note
			);
			var trigger = React.createElement(
				"button",
				{ className: "edit"},
				React.createElement("i", { "className": "fa fa-pencil" })
			);
		}
		var popover = React.createElement(
			ReactBootstrap.Popover,
			{ 
				placement: "right",
			},
			React.createElement(
				"textarea",
				{
					defaultValue: this.props.note,
					onKeyPress: this.onTextAreaKeypress,
					onFocus: this.onTextAreaFocus,
					ref: "noteField"
				},
				null
			)
		);

		return React.createElement(
			"p",
			{ className: "note" },
			currentNote,
			React.createElement(
				ReactBootstrap.OverlayTrigger,
				{ 
					trigger: "click", 
					placement: "right", 
					overlay: popover, 
					rootClose: true, 
					animation: true, 
					delay: 10,
					ref: "popoverTrigger",
					onEntered: this.onPopoverReady,
					onExit: this.onPopoverHide
				},
				trigger
			)
		);
	}
});
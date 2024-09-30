import { Theme } from './theme.js';

function Footnoter() {
    var self = this;
    this.notes = [];
    this.add = function() {
	self.notes.push(this);
	return '<sup>' + self.notes.length + '</sup>';
    };
    this.clear = function() {
	self.notes = [];
    };

    this.end = function() {
	var ans = '.footnotes[\n';
	var len = self.notes.length;
	for (var i = 0; i < len; i++) {
	    ans += '1. ' + self.notes[i] + '\n';
	}
	ans += '\n]\n';
	self.notes = [];
	return ans;
    };
}

// Constructor for the EPCC theme
// Can override the header and footer macros to customise text
function EpccTheme() {
    this.base = (str => str.substring(0, str.lastIndexOf("/")))(import.meta.url);
    this.fn = new Footnoter();
    // Capture this for use in closures
    var self = this;
    this.header = function() {
	return self.subst("<img class=\"uoe\" src=\"$BASEURL/UoE_Horizontal.png\" alt=\"The University of Edinburgh logo\" /> <img class=\"epcc\" src=\"$BASEURL/epcc-logo.png\" alt=\"EPCC logo\"/>");
    };
    this.footer_text = "";
    this.footer = function() {
	return self.subst("<p>"+ self.footer_text + "</p>");
    }
    const macros = {
	scale_img: function (percentage, alt) {
	    var url = this;
	    alt = alt || "";
	    return '<img src="' + url + '" alt="' + alt + '" style="width: ' + percentage + '" />';
	},
	fn_start: this.fn.clear,
	fn_clear: this.fn.clear,
	fn_show: this.fn.end,
	fn: this.fn.add,
	header: this.header,
	footer: this.footer
    }

    Theme.call(this, this.base, '$BASEURL/style.css', macros, '$BASEURL/templates.md');
}

EpccTheme.prototype = Object.create(Theme.prototype);
EpccTheme.prototype.constructor = EpccTheme;

var epcc = new EpccTheme();

export {EpccTheme, epcc};

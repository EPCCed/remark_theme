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


function EpccTheme() {
    var base = (str => str.substring(0, str.lastIndexOf("/")))(document.currentScript.src);
    
    this.fn = new Footnoter();
    
    Theme.call(
	this,
	'$BASEURL/style.css',
	{
	    scale_img:  function (percentage) {
		var url = this;
		return '<img src="' + url + '" style="width: ' + percentage + '" />';
	    },	    
	    fn_start: this.fn.clear,
	    fn_clear: this.fn.clear,
	    fn_show: this.fn.end,
	    fn: this.fn.add
	},
	'$BASEURL/templates.md'
    );
}
EpccTheme.prototype = Object.create(Theme.prototype);
EpccTheme.prototype.constructor = EpccTheme;

epcc = new EpccTheme();

// Create a theme object, that when installed, will change the look of
// Remark presentations.

// base_url = (Required) The base URL of the *theme*. You might wish
// to generate this dynamically with e.g.:
//   (str => str.substring(0, str.lastIndexOf("/")))(document.currentScript.src)
// This URL can be referenced in other parts of the theme with
// "$BASEURL"

// style_url = (Optional) The URL of the theme's .css file

// macros = (Optional) A mapping from keys to functions that define
// your theme's remark macros

// markdown_url = (Optional) The URL of the theme's Markdown preamble
// (to define slide templates etc)

function Theme(base_url, style_url, macros, markdown_url) {
    // Substitutions to be applied
    this.subs = [
	[/\$BASEURL/g, base_url]
    ];

    var subOrUndef = x => (x ? this.subst(x) : undefined);
    this.style = subOrUndef(style_url)
    this.macros = macros || {};
    this.markdown = subOrUndef(markdown_url);
};

Theme.prototype.subst = function(s) {
    this.subs.forEach(sub => {
	// regexp, replacement = sub
	s = s.replace(sub[0], sub[1]);
    });
    return s
};

Theme.prototype.loadUrl = function(url) {
    var xhr = new XMLHttpRequest();
    // TODO: make this asynchronous
    xhr.open('GET', url, false);
    xhr.send();
    return xhr.responseText;
};

// Install the theme into Remark (by intercepting the create function)
Theme.prototype.install = function (rmk, doc) {
    // So you can capture this in a closure
    var self = this;
    
    // in case you don't want to install on the global remark object
    rmk = rmk || remark;
    // ditto for current page
    doc = doc || document;
    
    if (this.style) {
	// Add style sheet to the document
	var fileref = doc.createElement("link");
	fileref.setAttribute("rel", "stylesheet");
	fileref.setAttribute("type", "text/css");
	fileref.setAttribute("href", this.style);
	doc.getElementsByTagName("head")[0].appendChild(fileref)
    }

    for (var key in this.macros) {
	// Install macros
	rmk.macros[key] = this.macros[key];
    }

    if (this.markdown) {
	// If there's a remark MD template, prepend to user's MD
	
	// Grab the original create method
	this.rmk_create = rmk.create;
	
	// Replace with our own
	rmk.create = function(options) {
	    // Note: 
	    // 'this' is the remark API object
	    // 'self' is the Theme object that was installed
	    options = options || {};
	    
	    var body;
	    var header = self.subst(self.loadUrl(self.markdown));
	    
	    if (options.sourceUrl) {
		body = self.loadUrl(options.sourceUrl);
		delete options.sourceUrl;
	    } else if (options.hasOwnProperty('source')){
		body = options.source;
	    } else {
		sourceElement = this.dom.getElementById('source');
		if (sourceElement) {
		    body = unescape(sourceElement.innerHTML);
		    sourceElement.style.display = 'none';
		}
	    }

	    options.source = header + body;

	    return self.rmk_create.apply(this, [options]);
	}
    }
};

export {Theme};

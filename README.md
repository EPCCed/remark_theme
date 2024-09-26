# EPCC Remark theme

A [remark](https://remarkjs.com/) theme for
[EPCC](http://www.epcc.ed.ac.uk).

Also includes a more general theme adding mechanism.

First include the remark JavaScript into your HTML as well as this

```HTML
<script src="https://remarkjs.com/downloads/remark-latest.min.js"></script>
```

Then before you create the remark slideshow, install the theme, and
then create the slides as normal. Note your script must be a module (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules).

```
<script type="module">
import {epcc} from "https://EPCCed.github.io/remark_theme/latest.js";
epcc.install();
globalThis.slideshow = remark.create({sourceUrl: 'README.md'});
```

You can also specify a particular version of this using e.g. https://EPCCed.github.io/remark_theme/1/1/0/release.js

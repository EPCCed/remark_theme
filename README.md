# EPCC Remark theme

A [remark](https://remarkjs.com/) theme for
[EPCC](http://www.epcc.ed.ac.uk).

Also includes a more general theme adding mechanism.

First include the remark JavaScript into your HTML as well as this

```HTML
<script src="https://remarkjs.com/downloads/remark-latest.min.js"></script>
<script src="https://EPCCed.github.io/remark_theme/latest.js"></script>
```

Then before you create the remark slideshow, install the theme, and
then create the slides as normal.

```
epcc.install();
var slideshow = remark.create({sourceUrl: 'README.md'});
```



## UoE corporate color scheme

### Core colours

- Pantone 282 - UoE blue - rgb(0,50,95)
- Pantone 199 - UoE red - rgb(193,0,67)

### Secondary colours (muted)
- Pantone 3025 - UoE mutedblue - rgb(0,84,107)
- Pantone 483 - UoE mutedred - rgb(107,48,33)
- Pantone 3435 - UoE mutedgreen - rgb(2,73,48)
- Pantone 391 - UoE mutedyellow - rgb(158,158,7)
- Pantone 643 - UoE mutedcyan - rgb(198,209,214)
- Pantone 5005 - UoE mutedpink - rgb(188,135,135)
- Pantone 7475 - UoE mutedturquoise - rgb(89,135,135)
- Pantone 7518 - UoE mutedorange - rgb(112,79,69)

### Secondary colours (bright)
- Pantone 207 - UoE brightred - rgb(173,3,59)
- Pantone 226 - UoE brightpink - rgb(209,3,115)
- Pantone 159 - UoE brightorange - rgb(194,94,3)
- Pantone 130 - UoE brightyellow - rgb(230,176,18)
- Pantone 2425 - UoE brightmagenta - rgb(130,0,94)
- Pantone 3135 - UoE brightblue - rgb(0, 153,171)
- Pantone 311 - UoE brightcyan - rgb(41,194,222)
- Pantone 368 - UoE brightgreen - rgb(97,191,26)

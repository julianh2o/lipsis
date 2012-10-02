lipsis
======

jQuery plugins to replace segments of text with an ellipsis.

This plugin should work on just about any block level container.

Usage:

```javascript
$(".selector").lipsis(); //Use default options
```

Equivalent to.. 

```javascript
$(".selector").lipsis({
	rows: 1,
	location: right
});
```


Designed to handle nested elements gracefully.. for example.. 

```html
<div class="lipsis">
	<span>some text</span> some more text <a href="#">some link text</a>
</div>
```
See lipsis-test.html for more examples.



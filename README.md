# DraftJS KaTeX Plugin

*This is a plugin for the `draft-js-plugins-editor`.*

This plugin insert and render LaTeX using [KaTeX](https://github.com/Khan/KaTeX), modified from [TeX example](https://github.com/facebook/draft-js/tree/master/examples/draft-0-10-0/tex).

- Integrated with [Khan/math-input](https://github.com/Khan/math-input).

## Usage

Add MathQuill libs
```html
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/mathquill/0.10.1/mathquill.min.js"></script>
```

Add plugin
```js
import createKaTeXPlugin from 'draft-js-katex-plugin';

const kaTeXPlugin = createKaTeXPlugin();

const { InsertButton } = kaTeXPlugin;
```

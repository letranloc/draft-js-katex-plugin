# DraftJS KaTeX Plugin

*This is a plugin for the `draft-js-plugins-editor`.*

This plugin insert and render LaTeX using [KaTeX](https://github.com/Khan/KaTeX), modified from [TeX example](https://github.com/facebook/draft-js/tree/master/examples/draft-0-10-0/tex).

## Usage

Add KaTeX style
```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.7.1/katex.min.css" integrity="sha384-wITovz90syo1dJWVh32uuETPVEtGigN07tkttEqPv+uR2SE/mbQcG7ATL28aI9H0" crossorigin="anonymous">
```

Add plugin
```js
import createKaTeXPlugin from 'draft-js-katex-plugin';

const kaTeXPlugin = createKaTeXPlugin();

const { InsertButton } = kaTeXPlugin;
```

## TODO

- [ ] Integrate with [Khan/math-input](https://github.com/Khan/math-input).

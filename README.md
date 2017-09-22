# DraftJS KaTeX Plugin

*This is a plugin for the `draft-js-plugins-editor`.*

This plugin insert and render LaTeX using [KaTeX](https://github.com/Khan/KaTeX), modified from [TeX example](https://github.com/facebook/draft-js/tree/master/examples/draft-0-10-0/tex).

- Integrated with [Khan/math-input](https://github.com/Khan/math-input).

## Usage

Add MathQuill libs if you want to use MathInput:
```html
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/mathquill/0.10.1/mathquill.min.js"></script>
```

Add plugin
```js
import createKaTeXPlugin from 'draft-js-katex-plugin';
import katex from 'katex'

const kaTeXPlugin = createKaTeXPlugin({katex});

const { InsertButton } = kaTeXPlugin;
```

With MathInput:

```js
import createKaTeXPlugin from 'draft-js-katex-plugin';
import katex from 'katex'
import MathInput from '../src/components/math-input/components/app';


const kaTeXPlugin = createKaTeXPlugin({katex, MathInput});

const { InsertButton } = kaTeXPlugin;
```

There are more examples in the `stories/index.js` file. 

## Configuration options:

Here shown with defaults:
```js
{
    katex, // the katex object or a wrapper defining render() and __parse().

    doneContent: {    
        valid: 'Done',
        invalid: 'Invalid TeX',
    },
    
    MathInput: null, // Sett to the MathInput element to use MathInput
    removeContent: 'Remove',
    theme: {
        // CSS classes, either you define them or they come from the plugin.css import
        saveButton: '',
        removeButton: '',
        invalidButton: '',
        buttons: '',
    }
    // function (string) -> string. 
    translator: null, 
}
```

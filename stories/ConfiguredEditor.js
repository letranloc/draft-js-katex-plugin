import React, { Component } from 'react';
import asciimath2latex from 'asciimath-to-latex';
import { EditorState } from 'draft-js';

import Editor from 'draft-js-plugins-editor';

import MathInput from 'math-input/dist/components/app';
import createKaTeXPlugin from '../src/index';
import '../src/styles.css';

import katex from '../src/katex';

const katexTheme = {
  insertButton: 'Button Button-small Button-insert',
};

function configuredEditor(props) {
  const kaTeXPlugin = createKaTeXPlugin({
    // the configs here are mainly to show you that it is possible. Feel free to use w/o config
    doneContent: { valid: 'Close', invalid: 'Invalid syntax' },
    katex, // <-- required
    MathInput: props.withMathInput ? MathInput : null,
    removeContent: 'Remove',
    theme: katexTheme,
    translator: props.withAsciimath ? asciimath2latex : null,
  });

  const plugins = [kaTeXPlugin];

  const baseEditorProps = Object.assign({
    plugins,
  });

  return { baseEditorProps, InsertButton: kaTeXPlugin.InsertButton };
}

export default class ConfiguredEditor extends Component {
  static propTypes = {};

  constructor(props) {
    super(props);
    const { baseEditorProps, InsertButton } = configuredEditor(props);
    this.baseEditorProps = baseEditorProps;
    this.InsertButton = InsertButton;
    this.state = { editorState: EditorState.createEmpty() };
  }

  componentDidMount() {
    this.focus();
  }

  // use this when triggering a button that only changes editorstate
  onEditorStateChange = editorState => {
    this.setState(() => ({ editorState }));
  };

  focus = () => {
    this.editor.focus();
  };

  render() {
    const { InsertButton } = this;

    return (
      <div>
        <h1>DraftJS KaTeX Plugin</h1>
        <div style={{ border: '#ccc 1px solid', background: '#ccc', padding: 10 }}>
          <InsertButton />
          <InsertButton initialValue="int(s-x)^3">Insert ascii math</InsertButton>
        </div>
        <Editor
          plugins={this.baseEditorProps.plugins}
          ref={element => this.editor = element}
          editorState={this.state.editorState}
          onChange={this.onEditorStateChange}
        />
      </div>
    );
  }
}

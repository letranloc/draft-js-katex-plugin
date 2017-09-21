import React, { Component } from 'react';
import asciimath2latex from 'asciimath-to-latex';
import { EditorState } from 'draft-js';

import Editor from 'draft-js-plugins-editor';

import MathInput from '../src/components/math-input/components/app';
import createKaTeXPlugin from '../src/index';

const katexTheme = {
  saveButton: 'Button Button-small Button-main',
  removeButton: 'Button Button-small Button-main',
  invalidButton: 'Button-small Button-alert',
  buttons: 'ButtonGroup',
};

function configuredEditor(props) {
  const kaTeXPlugin = createKaTeXPlugin({
    // the configs here are mainly to show you that it is possible. Feel free to use w/o config
    theme: katexTheme,
    doneContent: { valid: 'Close', invalid: 'Invalid syntax' },
    removeContent: 'Remove',
    MathInput: props.withMathInput ? MathInput : null,
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
      <div style={{ background: '#ccc' }}>
        <h1>Editor:</h1>
        <div style={{ border: '#ccc 1px solid' }}>
          <div>
            <InsertButton />
            Insert ascii:
            <InsertButton initialValue="int(s-x)^3">Insert ascii math</InsertButton>
          </div>
          <Editor
            plugins={this.baseEditorProps.plugins}
            ref={element => {
              this.editor = element;
            }}
            editorState={this.state.editorState}
            onChange={this.onEditorStateChange}
          />
        </div>
      </div>
    );
  }
}

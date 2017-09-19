import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  Entity,
  EditorState,
  ContentState,
  convertFromRaw,
  convertToRaw,
  DefaultDraftBlockRenderMap,
  AtomicBlockUtils,
} from 'draft-js';

import Editor, { composeDecorators } from 'draft-js-plugins-editor';

import { Map } from 'immutable';

import createKaTeXPlugin from '../src/index.js';

const katexTheme = {
  saveButton: 'Button Button-small Button-main',
  removeButton: 'Button Button-small Button-main',
  invalidButton: 'Button-small Button-alert',
  buttons: 'ButtonGroup',
};

export function configuredEditor() {
  const kaTeXPlugin = createKaTeXPlugin({
    // the configs here are mainly to show you that it is possible. Feel free to use w/o config
    theme: katexTheme,
    doneContent: { valid: 'Close', invalid: 'Invalid syntax' },
    removeContent: 'Remove',
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
    const { baseEditorProps, InsertButton } = configuredEditor();
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

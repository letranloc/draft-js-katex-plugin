import React, { Component } from 'react';
import { Entity } from 'draft-js';
import unionClassNames from 'union-class-names';
import KatexOutput from './KatexOutput';
//import MathInput from './math-input/components/app';

export default class TeXBlock extends Component {
  constructor(props) {
    super(props);
    this.state = { editMode: false };
  }

  callbacks = {};

  onClick = () => {
    if (this.state.editMode || this.props.store.getReadOnly()) {
      return;
    }
    this.setState(
      {
        editMode: true,
        ...this.getValue(),
      },
      () => {
        this.startEdit();
      }
    );
  };

  onValueChange = evt => {
    const value = evt.target.value;
    this.onMathInputChange(value);
  };

  onFocus = () => {
    if (this.callbacks.blur) {
      this.callbacks.blur();
    }
  };

  onMathInputChange = inputValue => {
    let invalid = false;
    const value = this.props.translator(inputValue);
    try {
      this.props.katex.__parse(value); // eslint-disable-line no-underscore-dangle
    } catch (e) {
      invalid = true;
    } finally {
      this.setState({
        invalidTeX: invalid,
        value,
        inputValue,
      });
    }
  };

  getValue = () => {
    const entityKey = this.props.block.getEntityAt(0);
    const entityData = Entity.get(entityKey).getData();
    return entityData;
  };

  startEdit = () => {
    const { block, blockProps } = this.props;
    blockProps.onStartEdit(block.getKey());
  };

  finishEdit = newContentState => {
    const { block, blockProps } = this.props;
    blockProps.onFinishEdit(block.getKey(), newContentState);
  };

  remove = () => {
    const { block, blockProps } = this.props;
    blockProps.onRemove(block.getKey());
  };

  save = () => {
    const { block, store } = this.props;

    const entityKey = block.getEntityAt(0);
    const editorState = store.getEditorState();

    Entity.mergeData(entityKey, {
      value: this.state.value,
      inputValue: this.state.inputValue,
    });

    this.setState(
      {
        invalidTeX: false,
        editMode: false,
        value: null,
      },
      this.finishEdit.bind(this, editorState)
    );
  };

  render() {
    const { theme, doneContent, removeContent, katex } = this.props;

    let texContent = null;
    if (this.state.editMode) {
      if (this.state.invalidTeX) {
        texContent = '';
      } else {
        texContent = this.state.value;
      }
    } else {
      texContent = this.getValue().value;
    }
    const displayMode = this.getValue().displayMode;

    let className = theme.tex;
    if (this.state.editMode) {
      className = unionClassNames(className, theme.activeTeX);
    }

    let editPanel = null;
    if (this.state.editMode) {
      let buttonClass = theme.saveButton;
      if (this.state.invalidTeX) {
        buttonClass = unionClassNames(buttonClass, theme.invalidButton);
      }

      editPanel = (
        <div className={theme.panel}>
          <textarea
            className={theme.texValue}
            onChange={this.onValueChange}
            onFocus={this.onFocus}
            ref={textarea => {
              this.textarea = textarea;
            }}
            value={this.state.inputValue}
          />
          <div className={theme.buttons}>
            <button className={buttonClass} disabled={this.state.invalidTeX} onClick={this.save}>
              {this.state.invalidTeX ? doneContent.invalid : doneContent.valid}
            </button>
            <button className={theme.removeButton} onClick={this.remove}>
              {removeContent}
            </button>
          </div>
        </div>
      );
    }

    const MathInput = this.props.MathInput || KatexOutput;
    return (
      <div className={className}>
        {this.state.editMode ? (
          <MathInput
            callbacks={this.callbacks}
            displayMode={displayMode}
            katex={katex}
            onChange={this.onMathInputChange}
            value={texContent}
          />
        ) : (
          <KatexOutput katex={katex} value={texContent} onClick={this.onClick} displayMode={displayMode} />
        )}

        {editPanel}
      </div>
    );
  }
}

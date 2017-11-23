import { EditorState } from 'draft-js';
import decorateComponentWithProps from 'decorate-component-with-props';
import TeXBlock from './components/TeXBlock';
import removeTeXBlock from './modifiers/removeTeXBlock';
import InsertButton from './components/InsertKatexButton';

import styles from './styles.css';

function noopTranslator(tex) {
  return tex;
}

const defaultTheme = {
  tex: styles.tex,
  activeTex: styles.activeTeX,
  panel: styles.panel,
  texValue: styles.texValue,
  buttons: styles.buttons,
  saveButton: styles.saveButton,
  removeButton: styles.removeButton,
  invalidButton: styles.invalidButton,
  insertButton: styles.insertButton
};

export default (config = {}) => {
  const theme = Object.assign(defaultTheme, config.theme || {});
  const insertContent = config.insertContent || 'Ω';
  const doneContent = config.doneContent || {
    valid: 'Done',
    invalid: 'Invalid TeX',
  };
  const removeContent = config.removeContent || 'Remove';
  const translator = config.translator || noopTranslator;
  const katex = config.katex;

  if (!katex || !katex.render) {
    throw new Error('Invalid katex plugin provided!');
  }

  const store = {
    getEditorState: undefined,
    setEditorState: undefined,
    getReadOnly: undefined,
    setReadOnly: undefined,
    onChange: undefined,
  };

  const liveTeXEdits = new Map();

  const component = decorateComponentWithProps(TeXBlock, {
    theme,
    store,
    doneContent,
    removeContent,
    translator,
    katex,
    MathInput: config.MathInput,
  });

  return {
    initialize: ({ getEditorState, setEditorState, getReadOnly, setReadOnly }) => {
      store.getEditorState = getEditorState;
      store.setEditorState = setEditorState;
      store.getReadOnly = getReadOnly;
      store.setReadOnly = setReadOnly;
    },

    blockRendererFn: block => {
      if (block.getType() === 'atomic') {
        const entity = store
          .getEditorState()
          .getCurrentContent()
          .getEntity(block.getEntityAt(0));
        const type = entity.getType();

        if (type === 'KateX') {
          return {
            component,
            editable: false,
            props: {
              onStartEdit: blockKey => {
                liveTeXEdits.set(blockKey, true);
                store.setReadOnly(liveTeXEdits.size);
              },

              onFinishEdit: (blockKey, newEditorState) => {
                liveTeXEdits.delete(blockKey);
                store.setReadOnly(liveTeXEdits.size);
                store.setEditorState(EditorState.forceSelection(newEditorState, newEditorState.getSelection()));
              },

              onRemove: blockKey => {
                liveTeXEdits.delete(blockKey);
                store.setReadOnly(liveTeXEdits.size);

                const editorState = store.getEditorState();
                const newEditorState = removeTeXBlock(editorState, blockKey);
                store.setEditorState(newEditorState);
              },
            },
          };
        }
      }
      return null;
    },
    InsertButton: decorateComponentWithProps(InsertButton, {
      theme,
      store,
      translator,
      defaultContent: insertContent,
    }),
  };
};

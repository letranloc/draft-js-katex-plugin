import {
    Entity,
    EditorState,
    AtomicBlockUtils
} from 'draft-js';

let count = 0;
const examples = [
    'f(x)=\\frac{ax^2}{y}+bx+c',

    'P(E) = \\binom{n}{k} p^k (1-p)^{ n-k}',

    '\\frac{1}{(\\sqrt{\\phi \\sqrt{5}}-\\phi) e^{\\frac25 \\pi}} =\n' +
    '1+\\frac{e^{-2\\pi}} {1+\\frac{e^{-4\\pi}} {1+\\frac{e^{-6\\pi}}\n' +
    '{1+\\frac{e^{-8\\pi}} {1+\\ldots} } } }',
];

export default function insertTeXBlock(editorState, tex, displayMode = true) {
    let texContent = tex;
    if (!texContent) {
        const nextFormula = count % examples.length;
        count += 1;
        texContent = examples[nextFormula];
    }

    const entityKey = Entity.create('KateX', 'IMMUTABLE', { content: texContent, displayMode });
    const newEditorState = AtomicBlockUtils.insertAtomicBlock(editorState, entityKey, ' ');

    return EditorState.forceSelection(
        newEditorState,
        editorState.getCurrentContent().getSelectionAfter()
    );
}

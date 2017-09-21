import React, { Component } from "react";
import PropTypes from "prop-types";
import unionClassNames from "union-class-names";
import insertTeXBlock from "../modifiers/insertTeXBlock";

export default class InsertKatexButton extends Component {
    static propTypes = {
        children: PropTypes.node.isRequired,
        translator: PropTypes.func.isRequired,
        theme: PropTypes.any,
        tex: PropTypes.string
    };
    static defaultProps = {
        initialValue: false
    };

    onClick = () => {
        const { store, translator, initialValue } = this.props;
        const editorState = store.getEditorState();
        store.setEditorState(insertTeXBlock(editorState, translator, initialValue));
    };

    render() {
        const { theme = {}, className, children } = this.props;
        const combinedClassName = unionClassNames(theme.insertButton, className);

        return (
            <button className={combinedClassName} onClick={this.onClick}>
                {children}
            </button>
        );
    }
}

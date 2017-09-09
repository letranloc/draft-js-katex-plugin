/**
 * React PropTypes that may be shared between components.
 */

const React = require('react');

const KeyConfigs = require('../data/key-configs');
const CursorContexts = require('./input/cursor-contexts');
const {
    BorderDirections,
    EchoAnimationTypes,
    IconTypes,
    KeyTypes,
    KeypadTypes,
} = require('../consts');

const iconPropType = React.PropTypes.shape({
    type: React.PropTypes.oneOf(Object.keys(IconTypes)).isRequired,
    data: React.PropTypes.string.isRequired,
});

const keyIdPropType = React.PropTypes.oneOf(Object.keys(KeyConfigs));

const keyConfigPropType = React.PropTypes.shape({
    ariaLabel: React.PropTypes.string,
    id: keyIdPropType.isRequired,
    type: React.PropTypes.oneOf(Object.keys(KeyTypes)).isRequired,
    childKeyIds: React.PropTypes.arrayOf(keyIdPropType),
    icon: iconPropType.isRequired,
});

const keypadConfigurationPropType = React.PropTypes.shape({
    keypadType: React.PropTypes.oneOf(Object.keys(KeypadTypes)).isRequired,
    extraKeys: React.PropTypes.arrayOf(keyIdPropType),
});

// NOTE(charlie): This is a React element.
const keypadElementPropType = React.PropTypes.shape({
    activate: React.PropTypes.func.isRequired,
    dismiss: React.PropTypes.func.isRequired,
    configure: React.PropTypes.func.isRequired,
    setCursor: React.PropTypes.func.isRequired,
    setKeyHandler: React.PropTypes.func.isRequired,
});

const bordersPropType = React.PropTypes.arrayOf(
    React.PropTypes.oneOf(Object.keys(BorderDirections))
);

const boundingBoxPropType = React.PropTypes.shape({
    height: React.PropTypes.number,
    width: React.PropTypes.number,
    top: React.PropTypes.number,
    right: React.PropTypes.number,
    bottom: React.PropTypes.number,
    left: React.PropTypes.number,
});

const echoPropType = React.PropTypes.shape({
    animationId: React.PropTypes.string.isRequired,
    animationType: React.PropTypes.oneOf(
        Object.keys(EchoAnimationTypes)
    ).isRequired,
    borders: bordersPropType,
    id: keyIdPropType.isRequired,
    initialBounds: boundingBoxPropType.isRequired,
});

const cursorContextPropType = React.PropTypes.oneOf(
    Object.keys(CursorContexts)
);

const popoverPropType = React.PropTypes.shape({
    parentId: keyIdPropType.isRequired,
    bounds: boundingBoxPropType.isRequired,
    childKeyIds: React.PropTypes.arrayOf(keyIdPropType).isRequired,
});

const childrenPropType = React.PropTypes.oneOfType([
    React.PropTypes.arrayOf(React.PropTypes.node),
    React.PropTypes.node,
]);

module.exports = {
    keyConfigPropType,
    keyIdPropType,
    keypadConfigurationPropType,
    keypadElementPropType,
    bordersPropType,
    boundingBoxPropType,
    echoPropType,
    cursorContextPropType,
    popoverPropType,
    iconPropType,
    childrenPropType,
};

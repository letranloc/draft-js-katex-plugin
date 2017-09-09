/**
 * Common parameters used to style components.
 */

const gray85 = '#D6D8DA';

module.exports = {
    brightGreen: '#78C008',
    gray17: '#21242C',
    gray25: '#3B3E40',
    gray68: '#888D93',
    gray76: '#BABEC2',
    gray85,
    iconSizeHeightPx: 48,
    iconSizeWidthPx: 48,
    compactKeypadBorderRadiusPx: 4,
    cursorHandleRadiusPx: 11,

    // The amount to multiply the radius by to get the distance from the
    // center to the tip of the cursor handle.  The cursor is a circle with
    // one quadrant replace with a square.  The hypotenuse of the square is
    // 1.41 times the radius of the circle.
    cursorHandleDistanceMultiplier: 1.41,

    // Keypad button colors
    valueGrey: '#FFF',
    operatorGrey: '#FAFAFA',
    controlGrey: '#F6F7F7',
    emptyGrey: '#F0F1F2',

    // Constants defining any borders between elements in the keypad.
    innerBorderColor: gray85,
    innerBorderStyle: 'solid',
    innerBorderWidthPx: 1,

    // The width at which a device is classified as a "tablet" for the purposes
    // of the keypad layout.
    tabletCutoffPx: 600,

    // The dimensions that define various components in the tree, which may be
    // needed outside of those components in order to determine various layout
    // parameters.
    pageIndicatorHeightPx: 16,
    navigationPadWidthPx: 192,
    // HACK(charlie): This should be injected by webapp somehow.
    // TODO(charlie): Add a link to the webapp location as soon as the footer
    // has settled down.
    toolbarHeightPx: 60,
};

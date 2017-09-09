const React = require('react');

const { View } = require('../fake-react-native-web');
const { components } = require('../index');

const { Keypad, KeypadInput } = components;

const App = React.createClass({
    getInitialState() {
        return {
            keypadElement: null,
            value: "",
        };
    },

    componentDidMount(){
        this.props.callbacks.value = (newVal) => {
            if (newVal) {
                this.setState({ value: newVal });
            } else {
                return this.state.value;
            }
        };
        this.props.callbacks.blur = () => {
            this.keypadInput.blur();
        };
    },

    onChange (value, cb) {
        //this.setState({ value }, cb);
        if (this.props.onChange) {
            this.props.onChange(value);
        }
    },

    render() {
        return <View>
            <div
                style={{
                    marginTop: 10,
                    marginLeft: 20,
                    marginRight: 20,
                    marginBottom: 40,
                }}
            >
                <KeypadInput
                    value={this.props.value}
                    keypadElement={this.state.keypadElement}
                    onChange={this.onChange}
                    onFocus={() => this.state.keypadElement.activate()}
                    onBlur={() => this.state.keypadElement.dismiss()}
                    ref={(element) => this.keypadInput = element}
                />
            </div>
            <Keypad
                onElementMounted={node => {
                    if (node && !this.state.keypadElement) {
                        this.setState({keypadElement: node});
                    }
                }}
            />
        </View>;
    },
});

module.exports = App;

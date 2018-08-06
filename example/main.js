const React = require('react');
const ReactDOM = require('react-dom');

const NPSInput = require('../src');

const Example = React.createClass({
    onSubmitAll({ score, comment }) {
        alert('Submitted ' + score + ' ' + comment);
    },

    render() {
        return (
            <div>
                <NPSInput onSubmitAll={this.onSubmitAll} ></NPSInput>
            </div>
        );
    }
});

ReactDOM.render(
    <Example />,
    document.getElementById('example')
);

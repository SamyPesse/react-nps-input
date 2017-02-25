const React = require('react');
const ReactDOM = require('react-dom');

const NPSInput = require('../src');

const Example = React.createClass({
    onSubmit({ score }) {
        alert('Submitted ' + score);
    },

    render() {
        return (
            <div>
                <NPSInput onSubmit={this.onSubmit}></NPSInput>
            </div>
        );
    }
});

ReactDOM.render(
    <Example />,
    document.getElementById('example')
);

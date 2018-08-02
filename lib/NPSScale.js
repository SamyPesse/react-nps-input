'use strict';

var React = require('react');
var classNames = require('classnames');

var MIN = 0;
var MAX = 10;

/**
 * Scale to select NPS value.
 * @param {ReactClass}
 */
var NPSScale = React.createClass({
    displayName: 'NPSScale',

    propTypes: {
        onSubmit: React.PropTypes.func.isRequired
    },

    getDefaultProps: function getDefaultProps() {
        return {
            onSubmit: function onSubmit(value) {}
        };
    },
    getInitialState: function getInitialState() {
        return {
            value: null
        };
    },
    onMouseEnter: function onMouseEnter(value) {
        this.setState({
            value: value
        });
    },
    onMouseLeave: function onMouseLeave(value) {
        this.setState({
            value: null
        });
    },
    onSelect: function onSelect(value) {
        var onSubmit = this.props.onSubmit;

        onSubmit(value);
    },
    render: function render() {
        var _this = this;

        var value = this.state.value;


        return React.createElement(
            'div',
            { className: 'NPSScale' },
            React.createElement(
                'div',
                { className: 'NPSScale-Values' },
                range(MIN, MAX).map(function (i) {
                    return React.createElement(
                        'div',
                        {
                            key: i,
                            className: classNames('NPSScale-Value', {
                                selected: value !== null && value >= i
                            }),
                            onMouseEnter: function onMouseEnter() {
                                return _this.onMouseEnter(i);
                            },
                            onMouseLeave: function onMouseLeave() {
                                return _this.onMouseLeave(i);
                            },
                            onClick: function onClick() {
                                return _this.onSelect(i);
                            }
                        },
                        React.createElement(
                            'div',
                            null,
                            i
                        )
                    );
                })
            ),
            React.createElement(
                'div',
                { className: 'NPSScale-Legend' },
                React.createElement(
                    'div',
                    { className: 'NPSScale-Label left' },
                    'Inte sannolikt'
                ),
                React.createElement(
                    'div',
                    { className: 'NPSScale-Label right' },
                    'Mycket sannolikt'
                )
            )
        );
    }
});

function range(start, end) {
    return Array(end - start + 1).fill().map(function (_, idx) {
        return start + idx;
    });
}

module.exports = NPSScale;
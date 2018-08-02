'use strict';

var React = require('react');
var classNames = require('classnames');
var NPSScale = require('./NPSScale');

/**
 * Promp the current user for its NPM score.
 * @param {ReactClass}
 */
var NPSInput = React.createClass({
    displayName: 'NPSInput',

    propTypes: {
        animated: React.PropTypes.bool,
        service: React.PropTypes.string,
        onSubmit: React.PropTypes.func.isRequired,
        onDismissed: React.PropTypes.func.isRequired,
        children: React.PropTypes.func
    },

    getDefaultProps: function getDefaultProps() {
        return {
            animated: true,
            onSubmit: function onSubmit() {},
            onDismissed: function onDismissed() {},
            children: function children() {
                return 'Tack för ditt svar!';
            }
        };
    },
    getInitialState: function getInitialState() {
        return {
            dismissed: false,
            score: null
        };
    },


    /**
     * User clicked on a value.
     */
    onSubmit: function onSubmit(score) {
        var onSubmit = this.props.onSubmit;

        this.setState({
            score: score
        }, function () {
            onSubmit({ score: score });
        });
    },


    /**
     * User clicked to dismiss this form.
     */
    onDismiss: function onDismiss() {
        var onDismissed = this.props.onDismissed;
        var score = this.state.score;


        this.setState({
            dismissed: true
        }, function () {
            onDismissed({ score: score });
        });
    },
    render: function render() {
        var _props = this.props,
            animated = _props.animated,
            service = _props.service,
            children = _props.children;
        var _state = this.state,
            dismissed = _state.dismissed,
            score = _state.score;


        var message = service ? 'Hur sannolikt \xE4r det att du skulle rekommendera ' + service + ' till en v\xE4n eller kollega?' : 'Hur sannolikt är det att du skulle rekommendera oss till en vän eller kollega?';

        if (dismissed) {
            return null;
        }

        return React.createElement(
            'div',
            { className: classNames('NPSInput', { animated: animated }) },
            React.createElement(
                'button',
                { className: 'NPSInput-Close', onClick: this.onDismiss },
                '\u2715'
            ),
            score ? React.createElement(
                'div',
                { className: 'NPSInput-Inner' },
                children({
                    score: score,
                    dismiss: this.onDismiss
                })
            ) : React.createElement(
                'div',
                { className: 'NPSInput-Inner' },
                React.createElement(
                    'p',
                    { className: 'NPSInput-Message' },
                    message
                ),
                React.createElement(NPSScale, { onSubmit: this.onSubmit })
            )
        );
    }
});

module.exports = NPSInput;
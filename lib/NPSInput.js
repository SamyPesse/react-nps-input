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
        onSubmitComment: React.PropTypes.func.isRequired,
        onSubmitAll: React.PropTypes.func.isRequired,
        onDismissed: React.PropTypes.func.isRequired,
        children: React.PropTypes.func
    },

    getDefaultProps: function getDefaultProps() {
        return {
            animated: true,
            onSubmit: function onSubmit() {},
            onSubmitComment: function onSubmitComment() {},
            onSubmitAll: function onSubmitAll() {},
            onDismissed: function onDismissed() {},
            children: function children() {
                return React.createElement(
                    'p',
                    { className: 'NPSInput-Label' },
                    'Ange ytterligare kommentarer (valfritt):'
                );
            }
        };
    },
    getInitialState: function getInitialState() {
        return {
            dismissed: false,
            score: null,
            comment: null,
            submitted: false
        };
    },


    /**
     * User clicked on a value.
     */
    onSubmit: function onSubmit(score) {
        this.setState({
            score: score
        });
    },


    /**
     * User clicked on a value.
     */
    onSubmitComment: function onSubmitComment(event) {
        var _state = this.state,
            score = _state.score,
            comment = _state.comment;

        this.submit(score, comment);
        event.preventDefault();
    },
    submit: function submit(score, comment) {
        var onSubmitAll = this.props.onSubmitAll;

        this.setState({
            score: score,
            comment: comment,
            submitted: true
        }, function () {
            onSubmitAll({ score: score, comment: comment });
        });
    },
    onChangeComment: function onChangeComment(event) {
        this.setState({
            comment: event.target.value
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
        var _state2 = this.state,
            dismissed = _state2.dismissed,
            score = _state2.score,
            submitted = _state2.submitted;


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
            submitted ? React.createElement(
                'div',
                { className: 'NPSInput-Inner' },
                React.createElement(
                    'p',
                    { className: 'NPSInput-Message' },
                    'Tack f\xF6r ditt svar!'
                )
            ) : score ? React.createElement(
                'div',
                null,
                React.createElement(
                    'div',
                    { className: 'NPSInput-Inner' },
                    children({
                        score: score,
                        dismiss: this.onDismiss
                    })
                ),
                React.createElement('label', { className: 'NPSComment-Label' }),
                React.createElement(
                    'form',
                    null,
                    React.createElement(
                        'div',
                        { className: classNames('NPSComment') },
                        React.createElement('input', { id: 'comment', className: 'NPSComment-Text', type: 'text',
                            placeholder: '', onChange: this.onChangeComment })
                    ),
                    React.createElement(
                        'div',
                        { className: classNames('NPSComment') },
                        React.createElement(
                            'button',
                            { className: 'NPSComment-Button', type: 'button',
                                onClick: this.onSubmitComment },
                            'Skicka'
                        )
                    )
                )
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
const React = require('react');
const classNames = require('classnames');
const NPSScale = require('./NPSScale');

/**
 * Promp the current user for its NPM score.
 * @param {ReactClass}
 */
const NPSInput = React.createClass({
    propTypes: {
        animated:    React.PropTypes.bool,
        service:     React.PropTypes.string,
        onSubmit:    React.PropTypes.func.isRequired,
        onDismissed: React.PropTypes.func.isRequired,
        children:    React.PropTypes.func
    },

    getDefaultProps() {
        return {
            animated:    true,
            onSubmit:    () => {},
            onDismissed: () => {},
            children:    () => 'Tack för ditt svar!'
        };
    },

    getInitialState() {
        return {
            dismissed: false,
            score: null
        };
    },

    /**
     * User clicked on a value.
     */
    onSubmit(score) {
        const { onSubmit } = this.props;
        this.setState({
            score
        }, () => {
            onSubmit({ score });
        });
    },

    /**
     * User clicked to dismiss this form.
     */
    onDismiss() {
        const { onDismissed } = this.props;
        const { score } = this.state;

        this.setState({
            dismissed: true
        }, () => {
            onDismissed({ score });
        });
    },

    render() {
        const { animated, service, children } = this.props;
        const { dismissed, score } = this.state;

        const message = service ?
            `Hur sannolikt är det att du skulle rekommendera ${service} till en vän eller kollega?`
            : 'Hur sannolikt är det att du skulle rekommendera oss till en vän eller kollega?';

        if (dismissed) {
            return null;
        }

        return (
            <div className={classNames('NPSInput', { animated })}>
                <button className="NPSInput-Close" onClick={this.onDismiss}>✕</button>

                {score ? (
                    <div className="NPSInput-Inner">
                        {children({
                            score,
                            dismiss: this.onDismiss
                        })}
                    </div>
                ) : (
                    <div className="NPSInput-Inner">
                        <p className="NPSInput-Message">
                            {message}
                        </p>
                        <NPSScale onSubmit={this.onSubmit} />
                    </div>
                )}

            </div>
        );
    }
});

module.exports = NPSInput;

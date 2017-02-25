const React = require('react');
const NPSScale = require('./NPSScale');

/**
 * Promp the current user for its NPM score.
 * @param {ReactClass}
 */
const NPSInput = React.createClass({
    propTypes: {
        service:     React.PropTypes.string,
        onSubmit:    React.PropTypes.func.isRequired,
        onDismissed: React.PropTypes.func.isRequired,
        children:    React.PropTypes.func
    },

    getDefaultProps() {
        return {
            onSubmit:    () => {},
            onDismissed: () => {},
            children:    () => 'Thank you for your feedback!'
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
        const { score } = this.state;

        this.setState({
            dismissed: true
        }, () => {
            onDismissed({ score });
        });
    },

    render() {
        const { service, children } = this.props;
        const { dismissed, score } = this.state;

        const message = service ?
            `How likely are you to recommend ${service} to your friends and colleagues?`
            : 'How likely are you to recommend us to your friends and colleagues?';

        if (dismissed) {
            return null;
        }

        return (
            <div className="NPSInput">
                <button className="NPSInput-Close" onClick={this.onDismiss}>✕</button>

                {score ? (
                    <div className="NPSInput-Inner">
                        {children({ score })}
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

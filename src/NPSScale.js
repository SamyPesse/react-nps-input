const React = require('react');
const classNames = require('classnames');

const MIN = 0;
const MAX = 10;

/**
 * Scale to select NPS value.
 * @param {ReactClass}
 */
const NPSScale = React.createClass({
    propTypes: {
        onSubmit: React.PropTypes.func.isRequired
    },

    getDefaultProps() {
        return {
            onSubmit: (value) => {}
        };
    },

    getInitialState() {
        return {
            value: null
        };
    },

    onMouseEnter(value) {
        this.setState({
            value
        });
    },

    onMouseLeave(value) {
        this.setState({
            value: null
        });
    },

    onSelect(value) {
        const { onSubmit } = this.props;
        onSubmit(value);
    },

    render() {
        const { value } = this.state;

        return (
            <div className="NPSScale">
                <div className="NPSScale-Values">
                    {range(MIN, MAX).map(i => (
                        <div
                            key={i}
                            className={classNames('NPSScale-Value', {
                                selected: value !== null && (value >= i)
                            })}
                            onMouseEnter={() => this.onMouseEnter(i)}
                            onMouseLeave={() => this.onMouseLeave(i)}
                            onClick={() => this.onSelect(i)}
                        >
                            <div>{i}</div>
                        </div>
                    ))}
                </div>
                <div className="NPSScale-Legend">
                    <div className="NPSScale-Label left">
                        Not at all likely
                    </div>
                    <div className="NPSScale-Label right">
                        Extremely likely
                    </div>
                </div>
            </div>
        );
    }
});

function range(start, end) {
    return Array(end - start + 1).fill().map((_, idx) => start + idx);
}

module.exports = NPSScale;

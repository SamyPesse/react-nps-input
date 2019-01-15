const PropTypes = require('prop-types');
const React = require('react');
const classNames = require('classnames');

const MIN = 0;
const MAX = 10;

/**
 * Scale to select NPS value.
 * @param {ReactClass}
 */
class NPSScale extends React.Component {
    static propTypes = {
        onSubmit: PropTypes.func.isRequired
    };

    static defaultProps = {
        onSubmit: (value) => {}
    };

    state = {
        value: null
    };

    onMouseEnter = (value) => {
        this.setState({
            value
        });
    };

    onMouseLeave = (value) => {
        this.setState({
            value: null
        });
    };

    onSelect = (value) => {
        const { onSubmit } = this.props;
        onSubmit(value);
    };

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
                        Inte sannolikt
                    </div>
                    <div className="NPSScale-Label right">
                        Mycket sannolikt
                    </div>
                </div>
            </div>
        );
    }
}

function range(start, end) {
    return Array(end - start + 1).fill().map((_, idx) => start + idx);
}

module.exports = NPSScale;

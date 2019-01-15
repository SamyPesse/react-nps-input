const PropTypes = require("prop-types");
const React = require("react");
const classNames = require("classnames");
const NPSScale = require("./NPSScale");

/**
 * Promp the current user for its NPM score.
 * @param {ReactClass}
 */
class NPSInput extends React.Component {
  static propTypes = {
    animated: PropTypes.bool,
    onSubmit: PropTypes.func.isRequired,
    onSubmitComment: PropTypes.func.isRequired,
    onSubmitAll: PropTypes.func.isRequired,
    onDismissed: PropTypes.func.isRequired,
    children: PropTypes.func
  };

  static defaultProps = {
    animated: true,
    onSubmit: () => {},
    onSubmitComment: () => {},
    onSubmitAll: () => {},
    onDismissed: () => {},
    children: () => (
      <p className="NPSInput-Label">Ange ytterligare kommentarer (valfritt):</p>
    )
  };

  state = {
    dismissed: false,
    score: null,
    comment: null,
    submitted: false
  };

  /**
   * User clicked on a value.
   */
  onSubmit = score => {
    this.setState({
      score
    });
  };

  /**
   * User clicked on a value.
   */
  onSubmitComment = event => {
    const { score, comment } = this.state;
    this.submit(score, comment);
    event.preventDefault();
  };

  submit = (score, comment) => {
    const { onSubmitAll } = this.props;
    this.setState(
      {
        score,
        comment,
        submitted: true
      },
      () => {
        onSubmitAll({ score, comment });
      }
    );
  };

  onChangeComment = event => {
    this.setState({
      comment: event.target.value
    });
  };

  /**
   * User clicked to dismiss this form.
   */
  onDismiss = () => {
    const { onDismissed } = this.props;
    const { score } = this.state;

    this.setState(
      {
        dismissed: true
      },
      () => {
        onDismissed({ score });
      }
    );
  };

  render() {
    const { animated, children } = this.props;
    const { dismissed, score, submitted } = this.state;

    const message =
      "Hur sannolikt är det att du skulle rekommendera tjänsten Mitt Fortum till en vän eller kollega?";

    if (dismissed) {
      return null;
    }

    return (
      <div className={classNames("NPSInput", { animated })}>
        <button className="NPSInput-Close" onClick={this.onDismiss}>
          ✕
        </button>
        {submitted ? (
          <div className="NPSInput-Inner">
            <p className="NPSInput-Message">Tack för ditt svar!</p>
          </div>
        ) : score !== null ? (
          <div>
            <div className="NPSInput-Inner">
              {children({
                score,
                dismiss: this.onDismiss
              })}
            </div>
            <label className="NPSComment-Label" />
            <form>
              <div className={classNames("NPSComment")}>
                <input
                  id="comment"
                  className="NPSComment-Text"
                  type="text"
                  placeholder=""
                  onChange={this.onChangeComment}
                />
              </div>
              <div className={classNames("NPSComment")}>
                <button
                  className="NPSComment-Button"
                  type="button"
                  onClick={this.onSubmitComment}
                >
                  Skicka
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="NPSInput-Inner">
            <p className="NPSInput-Message">{message}</p>
            <NPSScale onSubmit={this.onSubmit} />
          </div>
        )}
      </div>
    );
  }
}

module.exports = NPSInput;

// prettier-ignore
"use strict";

var React = require("react");
var classNames = require("classnames");

var MIN = 0;
var MAX = 10;

/**
 * Scale to select NPS value.
 * @param {ReactClass}
 */
class NPSScale extends React.Component {
  static displayName = "NPSScale";

  static propTypes = {
    onSubmit: React.PropTypes.func.isRequired
  };

  static defaultProps = {
    onSubmit: function onSubmit(value) {}
  };

  state = {
    value: null
  };

  onMouseEnter = (value) => {
    this.setState({
      value: value
    });
  };

  onMouseLeave = (value) => {
    this.setState({
      value: null
    });
  };

  onSelect = (value) => {
    var onSubmit = this.props.onSubmit;

    onSubmit(value);
  };

  render() {
    var _this = this;

    var value = this.state.value;

    return React.createElement(
      "div",
      { className: "NPSScale" },
      React.createElement(
        "div",
        { className: "NPSScale-Values" },
        range(MIN, MAX).map(function(i) {
          return React.createElement(
            "div",
            {
              key: i,
              className: classNames("NPSScale-Value", {
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
            React.createElement("div", null, i)
          );
        })
      ),
      React.createElement(
        "div",
        { className: "NPSScale-Legend" },
        React.createElement(
          "div",
          { className: "NPSScale-Label left" },
          "Inte sannolikt"
        ),
        React.createElement(
          "div",
          { className: "NPSScale-Label right" },
          "Mycket sannolikt"
        )
      )
    );
  }
}

function range(start, end) {
  return Array(end - start + 1)
    .fill()
    .map(function(_, idx) {
      return start + idx;
    });
}

module.exports = NPSScale;

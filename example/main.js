const React = require("react");
const ReactDOM = require("react-dom");

const NPSInput = require("../src");

class Example extends React.Component {
  onSubmitAll = ({ score, comment }) => {
    alert("Submitted " + score + " " + comment);
  };

  render() {
    return (
      <div>
        <NPSInput onSubmitAll={this.onSubmitAll} />
      </div>
    );
  }
}

ReactDOM.render(<Example />, document.getElementById("example"));

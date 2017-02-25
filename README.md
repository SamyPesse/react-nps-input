# react-nps-input

[![Build Status](https://travis-ci.org/GitbookIO/react-nps-input.svg?branch=master)](https://travis-ci.org/GitbookIO/react-nps-input)


### Installation

```
$ npm install react-nps-input --save
```

### Usage

```js
const React = require('react');
const NPSInput = require('react-nps-input');

const MyApp = React.createClass({
    onSubmit({ score }) {
        console.log(`Score for current user is ${score}/10`);
    },

    render() {
        return (
            <div>
                <NPSInput onSubmit={this.onSubmit}>{({ score }) => {



                }}</NPSInput>
            </div>
        );
    }
})
```

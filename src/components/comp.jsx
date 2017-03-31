import React, { Component } from 'react';

export default
class Comp extends Component {
    render() {
        return (
            <div>{this.props.text}</div>
        )
    }
}
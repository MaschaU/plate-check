import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";

export default class Results extends React.Component {
    constructor(props) {
        console.log(props);
        super(props);
        this.state = {
            result: this.props.result
        };
        console.log(this.props.result);
    
    }

    render() {
        return(
            <h1>I'm bloody rendering!</h1>
        )
    }
}
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

    /*
    componentDidUpdate(prevProps){
        console.log("ComponentDidUpdate())");
        if (this.props.result.productName != prevProps.result.productName)
        {
            this.setState(this.props.result);
        }
    }*/
/*
    UNSAFE_componentWillReceiveProps(newProperties){
        // We can't receive this in the constructor, because the parent component
        // has not retrieved the data from the database yet. It will be passed to
        // componentWillReceiveProps in a later render, at which point we copy
        // it to our state on the first receive of valid data.
        if (newProperties.display != undefined && newProperties.display != null){
            console.log(" -- setting new props, too");
            this.setState({result: newProperties.result});
        }
    }*/
    

    render() {
        console.log("Results.render()");
        let result = this.state.result;
        if (result===undefined || result == null || result.display == "welcome") {
            return(
                <h2>Ready to scan!</h2>
            )
        }
        if (result.display=="unsafe") {
            return(
                <div>
                    <h2>{result.productName}</h2>
                    <h2>Put this back on the shelf</h2>
                </div>
            )
        }
        if (result.display=="safe") {
            return(
                <div>
                    <h2>{result.productName}</h2>
                    <h2>Go ahead! It's perfectly safe to indulge in this product.</h2>
                </div>
            )
        }
        if (result.display=="error" || result.display == "unknown") {
            return(
                <div>
                    <h2>{result.productName}</h2>
                    <h2>Ooops. Seems like we don't have this product in our database.</h2>
                </div>
            )
        }
    }
}
import React, { useState } from "react";
import Scanner from "./scanner";
import ReactDOM from "react-dom";
import axios from "axios";
import Results from "./results";


export default class App extends React.Component {
    constructor (props)
    {
        super (props);
        this.state = {
            cameraShowing: false,
            scanResult: {
                display: "welcome",
                barcode: "none"
            }
        };

        this.onBarcodeRead = this.onBarcodeRead.bind(this);
    }
    // const [camera, setCamera] = useState(false);
    // const [result, setResult] = useState(null);

    onBarcodeRead (result) {
        if (result == "none") {
            return;
        }

        axios.post("/getIngredientsInfo", {codeToLookup:result}).then((result)=>{
            console.log("This is the result:", result.data);
            this.setState({scanResult: result.data});
        });
    };


    render() {
        console.log("App.render()");
        return (
            <div className="app">
                <div id="overlay"></div>
                <div id="banner">
                    <img src="https://i.imgur.com/5ygbHls.jpg" alt="food-image"/>
                    <h1>Plate Check</h1>
                </div>
                <button className="glow-on-hover" onClick={() => {
                    let newCameraState = !this.state.cameraShowing;
                    this.setState({cameraShowing: newCameraState});
                    if (!newCameraState) {
                        this.setState({scanResult: { barcode: "none", display: "welcome"}}); // restore to initial state
                    }
                    }}>
                    {this.state.cameraShowing ? "Stop" : "Start"}
                </button>
                <div className="container">
                    {this.state.cameraShowing && <Scanner onDetected={this.onBarcodeRead} />}
                </div>
                <Results result={this.state.scanResult} key={this.state.scanResult.barcode}/>
            </div>
        );
    }
}
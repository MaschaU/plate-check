import React, { useState } from "react";
import Scanner from "./scanner";
import ReactDOM from "react-dom";
import axios from "axios";
import Results from "./results";


export default function App() {
    const [camera, setCamera] = useState(false);
    const [result, setResult] = useState(null);

    const onDetected = result => {
        setResult(result);
        axios.post("/getIngredientsInfo", {codeToLookup:result}).then((result)=>{
            console.log("This is the result:", result.data);
            setResult(result.data);
        });
    };


    
    return (
        <div className="app">
            <h1>Plate Check</h1>
            <button onClick={() => setCamera(!camera)}>
                {camera ? "Stop" : "Start"}
            </button>
            <div className="container">
                {camera && <Scanner onDetected={onDetected} />}
            </div>
            <Results result={result}/>
        </div>
    );
}
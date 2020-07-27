import React, { useEffect } from "react";
import config from "./config.json";


const Scanner = props => {
const { onDetected } = props;

useEffect(() => {
        Quagga.init(config, error => {
            if (error) {
                console.log("Error in quagga init:", error);
            }
            Quagga.start();
            return () => {
                Quagga.stop();
            };
        });

        // The code below was located at https://codesandbox.io/embed/quaggajs-on-react-eexx8
        // and is expected to be in the public domain or a permissive license; it demonstrates use of the
        // Quagga library.

        // The visuals are pretty and really nice for demonstration purposes but are not strictly necessary
        // in a minimum viable product. For purposes of a pretty demonstration, I'm keeping the visuals
        // from this template code for the time being.

        Quagga.onProcessed(result => {
            var drawingCtx = Quagga.canvas.ctx.overlay,
                drawingCanvas = Quagga.canvas.dom.overlay;
            if (result) {
                if (result.boxes) {
                    drawingCtx.clearRect(
                        0,
                        0,
                        Number(drawingCanvas.getAttribute("width")),
                        Number(drawingCanvas.getAttribute("height"))
                    );
                    result.boxes.filter(function(box) {
                        return box !== result.box;
                    }).forEach(function(box) {
                        Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, {
                            color: "green",
                            lineWidth: 2
                        });
                    });
                }
                if (result.box) {
                    Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, {
                        color: "#00F",
                        lineWidth: 2
                    });
                }
                if (result.codeResult && result.codeResult.code) {
                    Quagga.ImageDebug.drawPath(
                        result.line,
                        { x: "x", y: "y" },
                        drawingCtx,
                        { color: "red", lineWidth: 3 }
                    );
                }
            }
        });
        Quagga.onDetected(detected);
    }, []);

    const detected = result => {
        onDetected(result.codeResult.code);
    };

    return (
        <div id="interactive" className="viewport" />
    );
};

export default Scanner;
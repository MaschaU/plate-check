<strong>Plate Check</strong>
<p>I developed Plate Check as my final project at <a href="https://www.spiced-academy.com/en/program/full-stack-web-development/?gclid=CjwKCAjw4MP5BRBtEiwASfwALxpOPOTnCn-ZlPACzpYwRih4SSzYRfxkCuOBJcq71BpkHsr1naRbwRoCStYQAvD_BwE">SPICED Academy</a> Berlin.
Plate Check is a React app I built for a friend of mine who's recently been diagnosed with IBS. With this app she can scan the barcode of a product and get the result that says weather the product is safe for her consumption or not.
<br></br>
<img src="https://media.giphy.com/media/J5vIkNMEBLXyyijfBN/giphy.gif"/>
<p>The app works with <a href="https://serratus.github.io/quaggaJS/">QuaggaJS</a>, a barcode-scanner entirely written in JavaScript supporting real- time localization and decoding of various types of barcodes such as EAN, CODE 128, CODE 39, EAN 8, UPC-A, UPC-C, I2of5, 2of5, CODE 93 and CODABAR. When Quagga returns a result, a 10 digits number is then being compared
against a list of unique product ID's contained in a MongoDB. Once there is a hit, a final comparison is being made against a list of ingredients to be avoided, contained in another, this time postgreSQL database. The app wil then return one of the three results:</p>
<ul>
<li>the product is safe for consumption</li>
<li>the product should be avoided</li>
<li>not enough info on the product</li>
</ul>

<strong>Tech stack</strong>
<p>React, QuaggaJS, Mongodb, Postgresql, Canvas, CSS, Nodejs with Express, npm</p>

<strong>Credits</strong>
<p>This app was developed with <a href="https://world.openfoodfacts.org/data">Open Food Facts</a> database, available under <a href="https://opendatacommons.org/licenses/odbl/1-0/">Open Data Licence</a>.</p>




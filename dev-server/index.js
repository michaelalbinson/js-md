'use strict';

const express = require('express');
const path = require('path');


const app = express();

app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/js', express.static(path.join(__dirname, 'js')));
app.use('/lib', express.static(path.join(__dirname, '..', 'dist')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'index.html'));
});


console.info('test server listening on 9898');
app.listen(9898);
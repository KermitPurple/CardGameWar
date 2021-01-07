const express = require('express');
const nunjucks = require('nunjucks');
const path = require('path');
let app = express();
const PORT = 5000;

nunjucks.configure('.', {
    autoescape: true,
    express: app,
});

app.use(express.static(__dirname));

app.get('/', (req, res)=>{
    res.render(index.html);
});

app.listen(PORT, ()=>{
    console.log(`Listening on http://localhost:${PORT}`);
});

const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 8080
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
const studentdata = require('./InitialData');
app.get('/api/student', (req, res) => {
   res.send(studentdata);
    
});
app.get('/api/student/:id', (req, res) => {
    const id = req.params.id;
    const data = studentdata.find(data=>data.id===parseInt(id));
    console.log(data);
    if(data===undefined)
    {
        res.status(404).send("id not found");
        return;
    }
    res.send(data);
    return;
    
});

app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;   

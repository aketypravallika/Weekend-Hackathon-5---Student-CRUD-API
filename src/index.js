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
app.post("/api/student", (req, res) => {
    res.set({'content-type':'application/x-www-form-urlencoded'});
    let {name, currentClass, division} = req.body;
    if(!name || !currentClass || !division){
        res.status(400);
        return;
    }
    let newdata = { id:studentdata.length+1,name:name,currentClass: parseInt(currentClass),division:division}
    studentdata.push(newdata);
   res.send(newdata);
    res.send(JSON.stringify(newdata.id));
});


app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;   

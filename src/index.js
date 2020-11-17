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
    if(!req.body.name||!req.body.currentClass)
    {
        res.status(404);
        return;   
    }
    if(!req.body.division)
    {
        res.status(404);
      return;
    }
    const newdata={
         id :studentdata.length+1,
         name:req.body.name,
         currentClass: parseInt(req.body.currentClass),
         division:req.body.division

    };
    studentdata.push(newdata);
    res.send(JSON.stringify(newdata));
});
app.put("/api/student/:id", (req, res) => {
    res.set({'content-type':'application/x-www-form-urlencoded'});
    
   
});

app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;   

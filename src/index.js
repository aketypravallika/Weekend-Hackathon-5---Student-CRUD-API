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
    
});app.get('/api/student/:id', (req, res) => {
    const id = req.params.id;
    const data = studentdata.find(data=>data.id===parseInt(id));
    console.log(data);
    if(!data)
    {
        res.status(404).send("id not found");
        return;
    }
    res.send(data);
    return;
    
});
app.post("/api/student", (req, res) => {
    
    if(!req.body.name||!req.body.currentClass)
    {
        res.status(400);
        return;   
    }
    if(!req.body.division)
    {
        res.status(400);
      return;
    }
    const newdata={
         id :studentdata.length+1,
         name:req.body.name,
         currentClass: parseInt(req.body.currentClass),
         division:req.body.division

    };
    studentdata.push(newdata);
    req.set({'content-type':'application/json'});
    res.send({id: studentdata.length });
});
app.put("/api/student/:id", (req, res) => {
    // req.set({'content-type':'application/x-www-form-urlencoded'});
    const id = req.params.id;
    
    const newid = studentdata.find(newid=>newid.id===parseInt(id));
    console.log("newdata"+ JSON.stringify({newid}));
    console.log("studentdata"+ JSON.stringify({studentdata}));
    if(!newid)
    {
        res.status(400).send("not valid id");
        return;
    }
    if(newid.name==="")
    {
        res.status(400);
        return;
    }
    newid.name = req.body.name;
    console.log(newid);
    
   res.send({name: newid.name} );
   return;
});
app.delete("/api/student/:id", (req, res) => {
    const id = req.params.id;
    const index = studentdata.find(index=>index.id===parseInt(id));
    if(!index)
    {
        res.status(404).send("not valid id");
        return;
    }

app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;   

const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 8080
app.use(express.urlencoded());
var http = require("http");
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
    
    if(!req.body.name||!req.body.currentClass)
    {
        res.status(400);
        return;   
    }
   else
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
    res.send({"id": newdata.id });
});
app.put("/api/student/:id", (req, res) => {
   
     
    const id = req.params.id;
    const newid = studentdata.find(newid=>newid.id===parseInt(id));
    
    if(!newid)
    {
        res.status(400).send("not valid id");
        return;
    }
   else
    if(req.body.name==="")
    {
        res.status(400);
        return;
    }
   else
    if(!Number.isInteger(req.body.currentClass)){
       res.status(400);
       return;
    }
   else
       if(!req.body.division.length === 1 || !req.body.division.match(/[A-Z]/)){
            res.status(400);
            return; 
        }
    const index = studentdata.findIndex(index => index.id === parseInt(id));
  const updatedata= {
        id:id,
        ...newid,
        ...req.body
    }
   studentdata.splice(index, 1,updatedata);
    res.send(req.body.name);
   
   
});
app.delete("/api/student/:id", (req, res) => {
    const id = req.params.id;
    const data = studentdata.find(data=>data.id===parseInt(id));
    if(!data)
    {
        res.status(404).send("not valid id");
        return;
    }
   const index = studentdata.findIndex(index => index.id === parseInt(id));
    studentdata.splice(index, 1);
    res.send(data);
});

app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app; 

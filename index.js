const express = require('express');
const app = express();
const courses = [
    {id:1,name: 'java'},
    {id:2,name: 'web'},
    {id:3,name: 'spring'}
]
app.use(express.json())

app.get('/',(req,res)=>{
    res.send('Home');
});
app.get('/api/courses',(req,res)=>{
    res.send(JSON.stringify(courses,null,4))
});
app.get('/api/courses/:year/:month',(req,res)=>{
    res.send(req.params)
})
app.get('/api/courses/:id',(req,res)=>{
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course)res.status(404).send(`Course Not Found`);
    res.send(course)
})

app.get('/api/students',(req,res)=>{
    res.send(req.query)
})

//post
app.post('/api/courses', (req,res)=>{
    const course = {
        id: courses.length + 1,
        name: req.body.name
    }
    courses.push(course);
    res.send(course)

});

//port 
const port = process.env.PORT || 3000
app.listen(port,()=>{console.log(`Listening on port ${port}....`);
})
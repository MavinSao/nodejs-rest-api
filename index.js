const Joi = require('joi');
const express = require('express');
const app = express();
const courses = [
    {id:1,name: 'java'},
    {id:2,name: 'web'},
    {id:3,name: 'spring'}
]
app.use(express.json())

//Home
app.get('/',(req,res)=>{
    res.send('Home');
});

//Get all course
app.get('/api/courses',(req,res)=>{
    res.send(JSON.stringify(courses,null,4))
});


app.get('/api/courses/:year/:month',(req,res)=>{
    res.send(req.params)
})

//Get course by Id
app.get('/api/courses/:id',(req,res)=>{
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course)res.status(404).send(`Course Not Found`);
    res.send(course)
})

//
app.get('/api/students',(req,res)=>{
    res.send(req.query)
})

//Post new course
app.post('/api/courses', (req,res)=>{
    const { error } = validateCourse(req.body)
    if(error){
        res.status(400).send(error.details[0].message);
        return;
    }

    // if(!req.body.name || req.body.name.length < 3){
    //     // 400 Bad Request
    //     res.status(400).send('Name is requird and should be minimum 3 char');
    //     return;
    // }
    const course = {
        id: courses.length + 1,
        name: req.body.name
    }
    courses.push(course);
    res.send(course)


});

//Update course
app.put('/api/courses/:id',(req,res)=>{
    //Look up for the course . If not found send 404 not found
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course)res.status(404).send(`Course Not Found`);
    //Validate
    const { error } = validateCourse(req.body)
    //If valid return 400 Bad-Request
    if(error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    //Update course
    course.name = req.body.name;
    res.send(course);
})

//Delete course
app.delete('/api/courses/:id',(req,res)=>{
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course)res.status(404).send(`Course Not Found`);
    else{
        courses.splice(req.params.id-1,1)
        res.send(course)
    }
})

//port 
const port = process.env.PORT || 3000
app.listen(port,()=>{console.log(`Listening on port ${port}....`);
}) 

//Validate Function
function validateCourse(course){
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(course, schema);
}
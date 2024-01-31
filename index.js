const express=require('express')
const app=express()
const authRoute=require('./routes/auth/auth')

app.use('/auth',authRoute)
app.get('/',(req,res)=>{
    res.send('Welcome To Home Page')
})

app.listen(5000,()=>{
    console.log('Server Started at 5000');
})

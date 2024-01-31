const router=require('express').Router()
require('dotenv').config()
const axios=require('axios')
const { log } = require('console')
const session=require('express-session')
const CLIENT_ID=process.env.CLIENT_ID
const CLIENT_SECRET=process.env.CLIENT_SECRET


const REDIRECT_URI="http://localhost:5000/auth/google/callback"
router.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true
  }));
router.get('/google',(req,res)=>{

const url=`https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=profile email`;
res.redirect(url)
})
router.get('/google/callback',async(req,res)=>{
   const {code}=req.query
try{
     const { data } = await axios.post('https://oauth2.googleapis.com/token', {
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      code,
      redirect_uri: REDIRECT_URI,
      grant_type: 'authorization_code',
    });
   const {access_token}=data
   const { data: profile} = await axios.get('https://www.googleapis.com/oauth2/v1/userinfo', {
    headers: { Authorization: `Bearer ${access_token}` },
  });
  req.session.user = profile
  const {name,email}=profile
res.send({
    "Status":"Signed In Successfull",
    "Name":name,
    "Email":email
})
}
catch(err){
    console.log(err);
    res.redirect('http://localhost:5000/auth/google')
}
})

router.get('/logout',(req,res)=>{
   
 res.clearCookie('connect.sid')
        res.redirect('/')
   

})





module.exports=router;
const cookieParser = require('cookie-parser');
var express = require('express');
const res = require('express/lib/response');
const { verify } = require('jsonwebtoken');
var router = express.Router();
var jwt = require("jsonwebtoken");
// I am not using any database the username and password are hardcoded as of now,
//while in real project we need to fetch the username and password(hash) from database

let username = "admin";
let userpassword = "12345";

router.get('/', function (req, res) {
  res.render('index', { title: 'Express' });
});


router.post('/api/login',(req,res)=>{
  let {name,password} = req.body;
  //lets use  jwt.sign({}, 'secret', {}) to generate a token
  if(username == name && userpassword == password)
  {
    let token = jwt.sign({name}, 'secret', {
      expiresIn:'1h'  //expire after 1 hour
    }
    )
  //for singned cookie we nee to pass  a secret inside cookieParser middleware
    res.cookie("token",token,{httpOnly:true,signed:true,maxAge:15*60*1000}) //expre after 15min (time is in millisecond)
    console.log(token)
    res.send("cookie set")
  }

  res.send("username password does not match")
})

//lets fetch the cookie now so that we can verify the user

router.get('/api/protected',(req,res)=>{
 // let token = req.cookies   //signed cookie can not accesssed using req.cookies
 let {token} = req.signedCookies 
 console.log("token before",token)

 token= token+"W"
 console.log("token after",token)
 //lets verify the token now
 //now lets make some change in token any again try to verify the user

 jwt.verify(token, 'secret', function(err,data){
   if(err)
   {
     console.log("err is ",err)
     res.send(`user is not authenticated`)
   }
   else
   {
     console.log("jwt verified successfully, authenticated user")
   let {name} = data
   res.send(`auth user name is ${name}`)

   }
   
 })

})

module.exports = router;

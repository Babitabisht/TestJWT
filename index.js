const express=require('express');
const jwt = require('jsonwebtoken');


const app = express();


app.get('/',(req,res)=>{

res.send("Getting Home route")

})



app.post('/api',verifyRequest,(req,res)=>{
console.log(req )
    console.log(`req...........${req.token}`)
jwt.verify(req.token,'secret',(err,data)=>{

if(err){
    res.sendStatus(403)
}else{
    res.json({
        message:"authenticated successsfully !",
        data
    })
}


})

res.send('Route api..................!!!')

})


app.get('/login',(req,res)=>{
    
    const user={
        name:"babita Bisht",
        password:"babita"

    } 

    jwt.sign({user},'secret',(err,token)=>{
         
        res.json({
            token
        })

    })

})


function  verifyRequest(req,res,next)
{
    let bearer=req.headers['authorization']
//console.log(bearer)
if(typeof bearer !== 'undefined'){
    let token=bearer.split(' ')
    let beareeToken=token[1]
    res.token=beareeToken;

    console.log(beareeToken)
    next();
}
    else{
console.log("here")
        res.sendStatus(403)
    }
    

}


const PORT=3000;

app.listen(PORT,(req,res)=>{

console.log(`App running successfully on port ${PORT} `)

})



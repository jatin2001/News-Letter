var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
const https = require('https');
var app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));
app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/index.html');
})
app.post('/',(req,res)=>{
    const {firstName,lastName,email} = req.body;
     const data = {
         members: [
             {
                 email_address: email,
                 status:"subscribed",
                 merge_fields:{
                     FNAME: firstName,
                     LNAME: lastName,
                 }
             }
         ]
     };
     const jsonData = JSON.stringify(data);
     const url = "https://us3.api.mailchimp.com/3.0/lists/ffac9678fc";
     const options ={
         method: "POST",
         auth:"jatin2001:2ef671d4210ecb72ff9c2c2500713ba0-us3"
     }

     const request = https.request(url,options, function(response)
     {  
         response.statusCode===200?res.sendFile(__dirname+'/success.html'):res.sendFile(__dirname +'/failure.html');
         response.on("data",function(data)
         {
             console.log(JSON.parse(data));  
         })
     })
    
     request.write(jsonData); 
     request.end();
    // res.sendFile(__dirname +'/subscribed.html')
})


app.post('/failure.html',(req,res)=>{
    res.redirect('/');
})

app.listen(process.env.PORT || 3000,()=>{
    console.log('server run at port 3000');
})

//api key
//2ef671d4210ecb72ff9c2c2500713ba0-us3

//list key
//ffac9678fc
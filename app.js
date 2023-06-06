//jshint esversion: 6

const express = require("express");
const https = require("https");
const client = require("@mailchimp/mailchimp_marketing");
client.setConfig({
  apiKey: "2b6***********da-us8",
  server: "us8",
});

const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
})

async function add(member)  {
    const response = await client.lists.addListMember("86*****b7", member);
  };

app.post("/" , function(req, res){ 
    const mail = req.body.email;
    const fName = req.body.fName;
    const lName = req.body.lName;
 
    const newMember = {email_address: mail , 
            status: 'subscribed',
            merge_fields: {
                FNAME: fName,
                LNAME: lName,
            }};
    
    add(newMember);

    res.send('Form submitted.');
})

app.listen(process.env.PORT || 3000, function(){
    console.log("Your Server is Running on Port 3000");
})
// 2b64f51e0e526cb06c2c9c524e219505-us8
// API Key: 2b6a0a8a2c9879cf5c4b203fb3bb74da-us8
// Audience ID: 860dd373b7

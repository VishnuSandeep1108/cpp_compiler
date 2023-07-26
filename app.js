//jshint esversion: 6

const express=require("express");
const bodyParser=require("body-parser");
// const https = require("https");
const mongoose = require("mongoose");
const qs = require("querystring");
const http = require("https");

var app=express();
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static("public"));

app.set('view engine', 'ejs');

app.listen(3000);

app.get("/", function(req,res){
  res.render("face");
});

app.post("/", function (request,response) {
  const options = {
	"method": "POST",
	"hostname": "code-compiler.p.rapidapi.com",
	"port": null,
	"path": "/v2",
	"headers": {
		"content-type": "application/x-www-form-urlencoded",
		"X-RapidAPI-Key": "847080b5cbmshf2e8ec2a707684fp182132jsn4aca81028b08",
		"X-RapidAPI-Host": "code-compiler.p.rapidapi.com",
		"useQueryString": true
	}
};

const req = http.request(options, function (res) {
	const chunks = [];

	res.on("data", function (chunk) {
		chunks.push(chunk);
	});

	res.on("end", function () {
		const body = Buffer.concat(chunks);
		// console.log(body.toString());
    var bod=JSON.parse(body);
    // response.send(bod);
    if(bod.Errors)
    response.send(bod.Errors);
    else
    response.send(bod.Result);
	});
});

req.write(qs.stringify({LanguageChoice: '7', Program: request.body.code}));
req.end();
});

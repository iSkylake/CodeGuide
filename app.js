const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
	res.sendFile(__dirname + '/public/views/CodeGuide.html');
});

app.get('/:language', function(req, res){
	fs.readFile(__dirname + "/public/views/LanguageScript.html", function(err, data){
		if(err){
			throw err;
		}
		let htmlString = data.toString();
		let matched = htmlString.match(/#LANG/gi).length;
		for(let i=0; i<matched; i++){
			htmlString = htmlString.replace('#LANG', req.params.language);
		}
		res.send(htmlString);
	});
});

app.listen(3000, function(){
	console.log('Server Started');
});
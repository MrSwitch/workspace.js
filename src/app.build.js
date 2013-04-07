// App.build.js
// Put this in the build package of Sublime Text 2
/*
{
	"cmd": ["node", "${file_path:${folder}}/app.build.js", "$file_path"],
	"working_dir" : "${file_path:${folder}}"
}
*/



//
// Package the files up
//
buildDist({
	"../dist/workspace.js" : ["./workspace.js","./jquery.touch.js"],
	"../dist/workspace.css" : ["./workspace.css"],
	"../README.md"	: ["../index.html"]
});



function buildDist(o){

	// Require IO operations
	var fs = require('fs');

	// Uglify-JS for compressing Javascript
	var UglifyJS = require("uglify-js");

	// Clean-CSS, exactly that
	var cleanCSS = require("clean-css");

	// newFile
	for(var newFile in o ){ if(o.hasOwnProperty(newFile)){

		var compound = [],
			minified = [],
			files = o[newFile];

		files.forEach(function(name, i){

			if(newFile.match(/.js$/)){
				compound.push( fs.readFileSync(name, "utf8") );
				minified.push( UglifyJS.minify(name).code );
			}
			else if(newFile.match(/.css$/)){
				compound.push( fs.readFileSync(name, "utf8") ),
				minified.push( cleanCSS.process(fs.readFileSync(name).toString() ) );
			}
			else if(newFile.match(/.md$/)){
				compound.push( htmlToMarkDown(fs.readFileSync(name, "utf8") ) );
			}
		});

		// Write files
		writeFile(newFile, compound.join("\n"));

		// Write files
		if(minified.length){
			writeFile(newFile.replace(/.([^.]+)$/,'.min.$1'), minified.join("\n"));
		}
	}}	



	// Write File
	function writeFile(name, code){
		fs.writeFile( name, code, function(err) {
			if(err) {
				console.log(err);
			} else {
				console.log(name + " created!");
			}
		});
	}


	//
	function htmlToMarkDown(s){

		//
		function getAttributes(s){
			var o = {};
			s.replace(/([a-z]+)\s*=\s*("|')?(.*?)(\2)/g, function(m,key,quote,value){
				o[key] = value;
			});
			return o;
		}

		// Loop through the HTML
		var lines = s.split(/\n/),
			r = [],
			body = false;

		for(var i=0;i<lines.length;i++){
			var line = lines[i];
			if(!body){
				if(line.match(/<body>/)){
					body = true;
				}
			}
			else if(line.match(/^[\s]/)){
				// replace
				r.push(line);
			}
			else{
				var reg = /<([a-z0-9]+)([^>]*)>(.*?)<\/\1>/g;
				r.push(line.replace(reg, function self(m,tag,attr,content){
					var suffix = '',
						prefix = tag.match(/h[0-9]/)?tag.replace(/h([0-9])/, function(m,c){
							var a = [];
							a.length = parseInt(c,10);
							return "#" + a.join("#")+" ";
						}):'';
					if(tag === 'a'){
						prefix = '[';
						suffix = ']('+(getAttributes(attr).href||'')+')';
					}
					return prefix + content.replace(reg,self) + suffix;
				}).replace(/<[^>]+>/g,''));
			}
		}

		return r.join("\n");
	}

}
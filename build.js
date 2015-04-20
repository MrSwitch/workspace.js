//
// Package the files up
//
require('shunt')({
	"./dist/workspace.js" : ["./src/workspace.js","./src/jquery.touch.js"],
	"./dist/workspace.css" : ["./src/workspace.css"],
	"./README.md"	: ["./index.html"]
});
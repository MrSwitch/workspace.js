//
// Package the files up
//
require('shunt')({
	"./dist/workspace.min.js" : ["./dist/workspace.js"],
	"./dist/workspace.css" : ["./src/workspace.css"],
	"./README.md"	: ["./index.html"]
});

// Test properties with prefix

export default function prefix(prop) {
	var s = (document.createElement('div')).style;
	return s[prop] !== undefined || s["Moz"+prop] !== undefined || s["Webkit"+prop] !== undefined || s["ms"+prop] !== undefined || s[prop.replace(/^./,function(m){return m.toUpperCase();})] !== undefined;
};

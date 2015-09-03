
export default function(r, o) {
	for (let x in o) {
		r[x] = o[x];
	}
	return r;
}

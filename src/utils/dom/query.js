// Select a single element
export default function(query, parent = document) {
	return parent.querySelector(query);
}

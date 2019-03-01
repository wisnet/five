/* src/js/debug.js */
export default function debug() {
	for (let i in arguments) {
		return console.log(arguments[i]);
	}
}

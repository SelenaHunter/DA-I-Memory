function timer() {

	let count = 0;
	let rAF_ID;

	let rAFCallback = function (callback) {
		if (score == 10) {
			return;
		}
		let count = callback;

		let s = Math.floor((count / 1000) % 60).toString().padStart(2, '0');
		let m = Math.floor((count / 60000) % 60);

		document.getElementById('labelTime').innerHTML = m + ":" + s;
		rAF_ID = requestAnimationFrame(rAFCallback);
	}

	// request animation frame on render
	rAF_ID = requestAnimationFrame(rAFCallback);

}

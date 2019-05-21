const cards = document.querySelectorAll('.card');
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let score = 0;
let numTries = 0;
let end = document.getElementById('game-end');

cards.forEach(card => card.addEventListener('click', flipCard));

function flipCard() {
	if (lockBoard) return;
	if (this === firstCard) return;
	runTimer();

	this.classList.toggle('flip');

	if (!hasFlippedCard) {
		//if hasFlippedCard is false, it's the first time the player has clicked a card
		hasFlippedCard = true;
		firstCard = this;
	} else {
		//if hasFlippedCard is true, it is the second time the player has clicked a card
		secondCard = this;
		checkForMatch();
	}
}

function checkForMatch() {
	if (firstCard.dataset.name === secondCard.dataset.name) {
		disableCards();
		addScore();
		numTries += 1;
	} else {
		numTries += 1;
		unflipCards();
	}
}

function disableCards() {
	firstCard.removeEventListener('click', flipCard);
	secondCard.removeEventListener('click', flipCard);
	resetBoard();
}

function unflipCards() {
	lockBoard = true;
	setTimeout(() => {
		firstCard.classList.remove('flip');
		secondCard.classList.remove('flip');
		resetBoard();
	}, 800);
}

function resetBoard() {
	[hasFlippedCard, lockBoard] = [false, false];
	[firstCard, secondCard] = [null, null];
}

(function shuffle() {
	cards.forEach(card => {
		let randomPos = Math.floor(Math.random() * 12);
		card.style.order = randomPos;
	});
})();

function addScore() {
	score += 1;
	labelScore.innerHTML = score;
	if (score == 10) {
		end.style.display = "grid";
		tries.style.display = "block";
		labelTries.innerHTML = numTries;
	}
}

// Timer functions
let timestampAtStart = null;
let lastRequestId = null;
function runTimer(timestamp) {
	if (!timestampAtStart) {
		timestampAtStart = timestamp;
	}
	let timeSinceStart = timestamp - timestampAtStart;
	lastRequestId = window.requestAnimationFrame(runTimer);
	
	let s = Math.floor((timeSinceStart / 1000) % 60).toString().padStart(2, '0');
	let m = Math.floor((timeSinceStart / 60000) % 60);
	document.getElementById('labelTime').innerHTML = m + ":" + s;
	if (score == 10) {
		lastRequestId = window.cancelAnimationFrame(lastRequestId)
	}
}
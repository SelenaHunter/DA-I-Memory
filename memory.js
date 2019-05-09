const cards = document.querySelectorAll('.card');
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let score = 0;
document.getElementById('#labelScore');

function flipCard() {
	if (lockBoard) return;
	if (this === firstCard) return;
	
	this.classList.toggle('flip');

	if (!hasFlippedCard) {
		//if false, it's the first time the player clicked a card
		hasFlippedCard = true;
		firstCard = this;
	} else {
		//second click
		secondCard = this;
		checkForMatch();
	}
}

function checkForMatch() {
	if (firstCard.dataset.name === secondCard.dataset.name) {
		disableCards();
		addScore();
	} else {
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
}

cards.forEach(card => card.addEventListener('click', flipCard));

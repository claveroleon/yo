const questions = [
    { q: "¿Qué prefieres?", a: "Viajar al pasado", b: "Viajar al futuro" },
    { q: "¿Cuál es mejor?", a: "Pizza", b: "Hamburguesa" },
    { q: "¿En qué trabajarías?", a: "Diseño UI/UX", b: "Backend Engineering" },
    { q: "¿Cómo descansas?", a: "Montaña y paz", b: "Playa y fiesta" },
    { q: "¿Qué superpoder eliges?", a: "Volar", b: "Invisibilidad" },
    { q: "¿Qué prefieres ver?", a: "Ciencia Ficción", b: "Fantasía Épica" },
    { q: "¿Cómo prefieres aprender?", a: "Libros físicos", b: "Videos/Tutoriales" },
    { q: "¿Cuál es tu clima?", a: "Invierno frío", b: "Verano intenso" }
];

let gameState = {
    round: 1,
    currentMatchIndex: 0,
    matches: [],
    winners: [],
    currentRoundWinners: []
};

const setupView = document.getElementById('setup-view');
const gameView = document.getElementById('game-view');
const winnerView = document.getElementById('winner-view');
const roundNameElem = document.getElementById('round-name');
const matchQuestionElem = document.getElementById('match-question');
const optionABtn = document.getElementById('option-a');
const optionBBtn = document.getElementById('option-b');
const winnerNameElem = document.getElementById('winner-name');

function initGame() {
    const shuffled = [...questions].sort(() => 0.5 - Math.random());
    gameState.matches = shuffled.map(q => ({
        question: q.q,
        optionA: q.a,
        optionB: q.b
    }));
    gameState.round = 1;
    gameState.currentMatchIndex = 0;
    gameState.currentRoundWinners = [];
    showView('game');
    updateMatchUI();
}

function updateMatchUI() {
    const currentMatch = gameState.matches[gameState.currentMatchIndex];
    if (gameState.round === 1) roundNameElem.innerText = "Cuartos de Final";
    else if (gameState.round === 2) roundNameElem.innerText = "Semifinales";
    else roundNameElem.innerText = "Gran Final";
    matchQuestionElem.innerText = currentMatch.question;
    optionABtn.innerText = currentMatch.optionA;
    optionBBtn.innerText = currentMatch.optionB;
    const card = document.getElementById('current-match');
    card.style.animation = 'none';
    card.offsetHeight;
    card.style.animation = 'slideUp 0.5s ease-out';
}

function handleOptionClick(selection) {
    const currentMatch = gameState.matches[gameState.currentMatchIndex];
    const winner = selection === 'a' ? currentMatch.optionA : currentMatch.optionB;
    gameState.currentRoundWinners.push(winner);
    gameState.currentMatchIndex++;
    if (gameState.currentMatchIndex >= gameState.matches.length) {
        if (gameState.currentRoundWinners.length === 1) {
            showWinner(gameState.currentRoundWinners[0]);
        } else {
            setupNextRound();
        }
    } else {
        updateMatchUI();
    }
}

function setupNextRound() {
    gameState.round++;
    gameState.matches = [];
    for (let i = 0; i < gameState.currentRoundWinners.length; i += 2) {
        gameState.matches.push({
            question: "¿Cuál de estos dos gana?",
            optionA: gameState.currentRoundWinners[i],
            optionB: gameState.currentRoundWinners[i+1]
        });
    }
    gameState.currentMatchIndex = 0;
    gameState.currentRoundWinners = [];
    updateMatchUI();
}

function showWinner(winner) {
    winnerNameElem.innerText = winner;
    showView('winner');
}

function showView(view) {
    setupView.classList.add('hidden');
    gameView.classList.add('hidden');
    winnerView.classList.add('hidden');
    if (view === 'setup') setupView.classList.remove('hidden');
    else if (view === 'game') gameView.classList.remove('hidden');
    else if (view === 'winner') winnerView.classList.remove('hidden');
}

document.getElementById('start-game').addEventListener('click', initGame);
document.getElementById('restart-game').addEventListener('click', () => showView('setup'));
optionABtn.addEventListener('click', () => handleOptionClick('a'));
optionBBtn.addEventListener('click', () => handleOptionClick('b'));

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});


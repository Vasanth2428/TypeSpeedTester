const quotes = [
  "The quick brown fox jumps over the lazy dog.",
  "Typing fast is a skill that improves with practice.",
  "JavaScript makes websites interactive and dynamic.",
  "Consistency is the key to mastering programming.",
  "Code is like humor. When you have to explain it, it’s bad."
];

let quote = "";
let timer;
let startTime;

const quoteDisplay = document.getElementById("quoteDisplay");
const quoteInput = document.getElementById("quoteInput");
const timerElement = document.getElementById("timer");
const wpmElement = document.getElementById("wpm");
const accuracyElement = document.getElementById("accuracy");

function startTest() {
  quote = quotes[Math.floor(Math.random() * quotes.length)];
  quoteDisplay.innerText = quote;
  quoteInput.value = "";
  quoteInput.disabled = false;
  quoteInput.focus();
  startTime = new Date();
  timerElement.innerText = "0";
  wpmElement.innerText = "0";
  accuracyElement.innerText = "100";
  clearInterval(timer);
  timer = setInterval(updateTimer, 1000);
}

function updateTimer() {
  const currentTime = Math.floor((new Date() - startTime) / 1000);
  timerElement.innerText = currentTime;
  updateStats();
}

function updateStats() {
  const input = quoteInput.value;
  const time = Math.floor((new Date() - startTime) / 1000) || 1;
  const wordsTyped = input.trim().split(/\s+/).length;
  const wpm = Math.floor((wordsTyped / time) * 60);
  wpmElement.innerText = wpm;

  let correct = 0;
  for (let i = 0; i < input.length; i++) {
    if (input[i] === quote[i]) correct++;
  }
  const accuracy = Math.floor((correct / quote.length) * 100);
  accuracyElement.innerText = accuracy;
}

quoteInput.addEventListener("input", () => {
  updateStats();
  if (quoteInput.value === quote) {
    clearInterval(timer);
    quoteInput.disabled = true;
  }
});

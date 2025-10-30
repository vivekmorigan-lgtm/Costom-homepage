/* ----------- Clock Script ----------- */
const dotCount = 10;
const radius = 115;
const trailDots = [];
const container = document.getElementById("trailContainer");
for (let i = 0; i < dotCount; i++) {
  const td = document.createElement("div");
  td.className = "trail";
  td.style.backgroundColor = "#45CC2D";
  td.style.opacity = ((0.7 * (dotCount - i)) / dotCount).toString();
  container.appendChild(td);
  trailDots.push(td);
}
function updateDate() {
  const now = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  document.getElementById("date").textContent = now.toLocaleDateString(
    undefined,
    options
  );
}
function updateClock() {
  const now = new Date();
  let hours = now.getHours() % 12;
  hours = hours ? hours : 12;
  hours = String(hours).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = now.getSeconds() + now.getMilliseconds() / 1000;
  document.getElementById("time").textContent = `${hours}:${minutes}`;
  updateDate();
  const deg = (seconds / 60) * 360;
  const rad = (deg * Math.PI) / 180;
  const dot1 = document.getElementById("dot1");
  dot1.style.transform = `translate(${radius * Math.sin(rad)}px, ${
    -radius * Math.cos(rad)
  }px)`;
  for (let i = 0; i < dotCount; i++) {
    const offset = i * 0.03;
    const radTrail = rad - offset * Math.PI * 2;
    trailDots[i].style.transform = `translate(${
      radius * Math.sin(radTrail)
    }px, ${-radius * Math.cos(radTrail)}px)`;
  }
  requestAnimationFrame(updateClock);
}
updateClock();

/* ----------- To-Do Script ----------- */
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
function addTask() {
  const taskText = taskInput.value.trim();
  if (!taskText) return;
  tasks.push({ text: taskText, completed: false });
  taskInput.value = "";
  saveTasks();
  renderTasks();
}
function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}
function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";
    li.innerHTML = `
            <span onclick="toggleComplete(${index})">${task.text}</span>
            <button onclick="deleteTask(${index})">✖</button>
          `;
    taskList.appendChild(li);
  });
}
renderTasks();

/* ----------- Toggle Panels ----------- */
const todoWidget = document.getElementById("todoWidget");
const todoToggle = document.getElementById("todoToggle");
todoToggle.addEventListener("click", () => {
  todoWidget.classList.toggle("show");
});

/* -------- Placeholder typing effect -------- */
const input = document.getElementById("search");
const words = [
  "Search something...",
  "Find mystery...",
  "Explore the earth...",
  "Discover new creatures...",
  "Look up for something...",
  "Browse documentaries...",
  "Seek knowledge...",
  "Investigate mysteries...",
  "Research topics...",
  "Inquire about...",
  "Surf the web...",
  "Navigate through...",
];
let wordIndex = 0;
let charIndex = 0;
let typing = true;

function typeEffect() {
  const currentWord = words[wordIndex];
  if (typing) {
    input.placeholder = currentWord.substring(0, charIndex + 1);
    charIndex++;
    if (charIndex === currentWord.length) {
      typing = false;
      setTimeout(typeEffect, 1500);
      return;
    }
  } else {
    input.placeholder = currentWord.substring(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      typing = true;
      wordIndex = (wordIndex + 1) % words.length;
    }
  }
  setTimeout(typeEffect, typing ? 100 : 50);
}
typeEffect();
/* -------- Quotes typing effect (random) -------- */
const quoteText = document.getElementById("quoteText");
const quotes = [
  "Believe you can and you're halfway there.",
  "Your limitation—it's only your imagination.",
  "Push yourself, because no one else is going to do it for you.",
  "Great things never come from comfort zones.",
  "Dream it. Wish it. Do it.",
  "Success doesn't just find you. You have to go out and get it.",
  "Don't watch the clock; do what it does. Keep going.",
  "Little things make big days.",
  "It's going to be hard, but hard does not mean impossible.",
  "Don't wait for opportunity. Create it.",
  "Dream bigger. Do bigger.",
  "Don't stop when you're tired. Stop when you're done.",
];

let qIndex = Math.floor(Math.random() * quotes.length); // start random
let qCharIndex = 0;
let qTyping = true;

function typeQuotes() {
  const current = quotes[qIndex];
  if (qTyping) {
    quoteText.textContent = current.substring(0, qCharIndex + 1);
    qCharIndex++;
    if (qCharIndex === current.length) {
      qTyping = false;
      setTimeout(typeQuotes, 1500);
      return;
    }
  } else {
    quoteText.textContent = current.substring(0, qCharIndex - 1);
    qCharIndex--;
    if (qCharIndex === 0) {
      qTyping = true;
      let newIndex;
      do {
        newIndex = Math.floor(Math.random() * quotes.length);
      } while (newIndex === qIndex && quotes.length > 1);
      qIndex = newIndex;
    }
  }
  setTimeout(typeQuotes, qTyping ? 100 : 50);
}
typeQuotes();

/* ----------- Random Online Background Script ----------- */
function applyRandomOnlineBackground() {
  const url = `https://picsum.photos/1920/1080?random=${Date.now()}`;
  document.body.style.backgroundImage = `url("${url}")`;
  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundPosition = "center";
  document.body.style.backgroundRepeat = "no-repeat";
}
setInterval(applyRandomOnlineBackground, 15000);
applyRandomOnlineBackground();

/* ----------- Circular Countdown Timer (added) ----------- */

const startBtn = document.getElementById("startTimer");
const timerCircle = document.getElementById("timerCircle");
const timerText = document.getElementById("timerText");
const timerDot = document.getElementById("timerDot");

let timerInterval = null;
let timerTotal = 0; // seconds
let timerRemaining = 0; // seconds

function parseTimeInput(str) {
  if (!str) return NaN;
  str = String(str).trim().toLowerCase();
  // hh:mm:ss or mm:ss or ss
  if (str.includes(":")) {
    const parts = str.split(":").map((p) => parseInt(p, 10));
    if (parts.some(isNaN)) return NaN;
    if (parts.length === 3) {
      return parts[0] * 3600 + parts[1] * 60 + parts[2];
    } else if (parts.length === 2) {
      return parts[0] * 60 + parts[1];
    } else if (parts.length === 1) {
      return parts[0];
    }
  }
  // patterns like 1h30m20s or 45m or 30s
  const regex = /(?:(\d+)\s*h)?\s*(?:(\d+)\s*m)?\s*(?:(\d+)\s*s)?/;
  const m = str.match(regex);
  if (m && (m[1] || m[2] || m[3])) {
    const h = parseInt(m[1] || 0, 10);
    const mm = parseInt(m[2] || 0, 10);
    const s = parseInt(m[3] || 0, 10);
    return h * 3600 + mm * 60 + s;
  }
  // plain number -> treat as seconds
  if (!isNaN(Number(str))) {
    return Math.max(0, Math.floor(Number(str)));
  }
  return NaN;
}

function formatTime(sec) {
  sec = Math.max(0, Math.floor(sec));
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = sec % 60;
  if (h > 0)
    return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function updateTimerUI() {
  // show remaining time inside circle
  timerText.textContent = formatTime(timerRemaining);

  // rotate dot proportional to progress (0 -> start, 1 -> finished)
  const progress = timerTotal > 0 ? 1 - timerRemaining / timerTotal : 0;
  const angleDeg = progress * 360; // rotate clockwise
  const angleRad = (angleDeg * Math.PI) / 180;
  // radius path for dot (slightly inside circle)
  const pathRadius = timerCircle.clientWidth / 2 - 14; // px
  const dx = Math.sin(angleRad) * pathRadius;
  const dy = -Math.cos(angleRad) * pathRadius;
  timerDot.style.transform = `translate(${dx}px, ${dy}px)`;
}

function startCircularTimer(seconds) {
  clearInterval(timerInterval);
  if (!Number.isFinite(seconds) || seconds <= 0) return;
  timerTotal = Math.floor(seconds);
  timerRemaining = timerTotal;

  // show UI
  timerCircle.classList.add("show");
  timerCircle.setAttribute("aria-hidden", "false");
  updateTimerUI();

  // tick every second
  timerInterval = setInterval(() => {
    timerRemaining--;
    if (timerRemaining < 0) {
      clearInterval(timerInterval);
      timerRemaining = 0;
      updateTimerUI();
      // final state: keep 00:00 visible briefly and then hide after 3s
      setTimeout(() => {
        timerCircle.classList.remove("show");
        timerCircle.setAttribute("aria-hidden", "true");
      }, 3000);
      return;
    }
    updateTimerUI();
  }, 1000);
}

// start button click -> prompt for time
startBtn.addEventListener("click", () => {
  const timeInput = prompt("Enter time");
  const secs = parseTimeInput(timeInput);
  if (!Number.isFinite(secs) || secs <= 0) {
    alert("Invalid time format or zero. Try: 90  OR  02:30");
    return;
  }
  startCircularTimer(secs);
});

// Save the original function
const originalStart = startCircularTimer;

// Override it
startCircularTimer = function (seconds) {
  originalStart(seconds); // call the normal timer

  // Watch the timer until it ends
  const checkInterval = setInterval(() => {
    if (typeof timerRemaining !== "undefined" && timerRemaining <= 0) {
      const audio = new Audio(
        "https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg"
      );
      audio.play();
      clearInterval(checkInterval); // stop checking
    }
  }, 200);
};

/* --- Search Engine Buttons Script --- */
const engineButtons = document.querySelectorAll(".engine-btn");
let currentEngine = engineButtons[0].dataset.url; // default Google

engineButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    engineButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    currentEngine = btn.dataset.url;
  });
});

// override form submit to use chosen engine
const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("search");

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const query = encodeURIComponent(searchInput.value.trim());
  if (!query) return;
  window.location.href = currentEngine + query;
});

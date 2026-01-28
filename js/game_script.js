let questions = [];
let timer = null;
let timeLeft = 45;
let used5050 = false;
let usedRefresh = false;
let usedExpert = false;
let usedAudience = false;

let safeAmount = 0;

const sfx = {
    questionStart: new Audio("../KBC_project/media/sounds/question_start.mp3"),
    bg: new Audio("../KBC_project/media/sounds/bg_during_question.mp3"),
    wrong: new Audio("../KBC_project/media/sounds/wrong_answer.mp3"),
    timeUp: new Audio("../KBC_project/media/sounds/time_up.mp3"),
    tick: new Audio("../KBC_project/media/sounds/timer.mp3"),
    finalWin: new Audio("../KBC_project/media/sounds/7_crore.mp3"),
    lock: new Audio("../KBC_project/media/sounds/lock.mp3")
};

const correctSounds = [
    new Audio("../KBC_project/media/sounds/answer_1.mp3"),
    new Audio("../KBC_project/media/sounds/answer_2.mp3"),
    new Audio("../KBC_project/media/sounds/answer_3.mp3"),
];

sfx.bg.loop = true;
sfx.bg.volume = 0.6;

// safe levels: question index 4 (Q5), index 9 (Q10)
const safeLevels = {
    4: 10000,
    9: 320000
};

function playRandomCorrectSound() {
    const index = Math.floor(Math.random() * correctSounds.length);
    correctSounds[index].play();
};

function startTimer() {
    stopTimer();

    timeLeft = 45;
    const timerBox = document.querySelector(".timer");
    timerBox.textContent = timeLeft;

    timerBox.style.display = "block";

    timer = setInterval(() => {
        timeLeft--;
        timerBox.textContent = timeLeft;

        // Turn red when < 10
        if (timeLeft <= 10) {
            timerBox.style.backgroundColor = "#b30000";
        } else {
            timerBox.style.backgroundColor = "#dc3545";
        }

        // Time up!
        if (timeLeft <= 0) {
            stopTimer();
            handleTimeUp();
        }

    }, 1000);
}

function stopTimer() {
    if (timer) {
        clearInterval(timer);
        timer = null;
    }
}

function handleTimeUp() {
    window.location.href = "gameover.html?amount=" + safeAmount;
}

/* LOAD QUESTIONS FROM OpenTDB API (15 total)*/

async function loadQuestionsFromAPI() {

    const easyURL = "https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple";
    const mediumURL = "https://opentdb.com/api.php?amount=5&category=9&difficulty=medium&type=multiple";
    const hardURL = "https://opentdb.com/api.php?amount=5&category=9&difficulty=hard&type=multiple";

    try {
        const [easyRes, medRes, hardRes] = await Promise.all([
            fetch(easyURL),
            fetch(mediumURL),
            fetch(hardURL)
        ]);

        const easyData = await easyRes.json();
        const medData = await medRes.json();
        const hardData = await hardRes.json();

        const easyQs = convertOpenTDB(easyData.results || []);
        const medQs = convertOpenTDB(medData.results || []);
        const hardQs = convertOpenTDB(hardData.results || []);

        questions.length = 0;
        questions.push(...easyQs, ...medQs, ...hardQs);


    } catch (error) {
        alert("Error loding questions");
    }
}

function initGame() {
    console.log("Game started");
    showQuestion();
}

let currentIndex = 0;

function showQuestion() {
    selectedOption = null;
    document.getElementById("lockBtn").disabled = true;
    const qBox = document.querySelector(".question");
    const optionsBox = document.querySelector(".options");
    const timerBox = document.querySelector(".timer");

    const qData = questions[currentIndex];

    // Show question text
    qBox.textContent = qData.q;

    // Clear old options
    optionsBox.innerHTML = "";

    // Create 4 option buttons
    qData.options.forEach((opt, i) => {
        const btn = document.createElement("button");
        btn.className = "btn option-btn w-100 py-3 fs-5";
        btn.textContent = opt;

        btn.addEventListener("click", () => selectOption(i));

        // Add to UI
        const col = document.createElement("div");
        col.className = "col-6";
        col.appendChild(btn);

        optionsBox.appendChild(col);
    });

    sfx.bg.pause();
    sfx.questionStart.play();

    setTimeout(() => {
        sfx.bg.currentTime = 0;
        sfx.bg.play();
    }, 1000);
    // --- TIMER LOGIC ---
    if (currentIndex < 12) {
        startTimer();
    } else {
        stopTimer();
        timerBox.textContent = "∞";  // untimed questions
        timerBox.style.backgroundColor = "#6f42c1";
    }

    if (safeLevels[currentIndex] !== undefined) {
        safeAmount = safeLevels[currentIndex];
    }
    updateLadder();
}

function fadeOutBG() {
    let fade = setInterval(() => {
        if (sfx.bg.volume > 0.05) sfx.bg.volume -= 0.05;
        else {
            sfx.bg.pause();
            sfx.bg.volume = 0.6;
            clearInterval(fade);
        }
    }, 120);
}

/* Convert OpenTDB → Game Format*/

function convertOpenTDB(apiResults) {
    return apiResults.map(item => {

        const decoder = document.createElement("textarea");

        decoder.innerHTML = item.question;
        const questionText = decoder.value;

        const incorrect = item.incorrect_answers.map(ans => {
            decoder.innerHTML = ans;
            return decoder.value;
        });

        decoder.innerHTML = item.correct_answer;
        const correct = decoder.value;

        const options = [...incorrect, correct];

        const answerIndex = Math.floor(Math.random() * 4);
        [options[answerIndex], options[3]] = [options[3], options[answerIndex]];

        return {
            q: questionText,
            options: options,
            answerIndex: answerIndex
        };
    });
}

let selectedOption = null;

function selectOption(index) {
    selectedOption = index;

    // Enable lock button
    document.getElementById("lockBtn").disabled = false;

    // Highlight selected
    document.querySelectorAll(".option-btn").forEach((btn, i) => {
        btn.classList.toggle("active", i === index);
    });
};

function use5050() {

    if (used5050) return; // already used

    const qData = questions[currentIndex];
    const correctIndex = qData.answerIndex;

    const buttons = document.querySelectorAll(".option-btn");

    // Create a list of incorrect answer indexes
    let wrongIndexes = [];
    buttons.forEach((btn, i) => {
        if (i !== correctIndex) wrongIndexes.push(i);
    });

    // Randomly remove 2 wrong options
    let toDisable = [];

    while (toDisable.length < 2) {
        const randomIndex = wrongIndexes[Math.floor(Math.random() * wrongIndexes.length)];
        if (!toDisable.includes(randomIndex)) {
            toDisable.push(randomIndex);
        }
    }

    // Disable + fade the two wrong options
    toDisable.forEach(i => {
        buttons[i].disabled = true;
        buttons[i].style.opacity = "0.4";
        buttons[i].style.pointerEvents = "none";
    });

    // Mark lifeline as used
    used5050 = true;

    // Fade the lifeline icon
    document.getElementById("lifeline5050").classList.add("used");
};

async function useRefresh() {
    if (usedRefresh) return; 

    // Determine difficulty based on position
    let difficulty = "easy";
    if (currentIndex >= 5 && currentIndex < 10) difficulty = "medium";
    if (currentIndex >= 10) difficulty = "hard";

    const apiURL = `https://opentdb.com/api.php?amount=1&category=9&difficulty=${difficulty}&type=multiple`;

    try {
        const res = await fetch(apiURL);
        const data = await res.json();

        if (!data.results || data.results.length === 0) {
            return useRefresh(); 
        }

        const newQ = convertOpenTDB(data.results)[0];

        questions[currentIndex] = newQ;

        document.getElementById("lifelineRefresh").classList.add("used");

        usedRefresh = true;

        showQuestion();

    } catch (err) {
        alert("Error fetching new question.");
    }
};

function useExpert() {
    if (usedExpert) return;

    const qData = questions[currentIndex];
    const correctIndex = qData.answerIndex;
    const correctText = qData.options[correctIndex];

    // Show popup
    document.getElementById("expertPopup").style.display = "flex";
    document.getElementById("expertText").textContent =
        `I believe the correct answer is: "${correctText}"`;

    // Disable lifeline visually
    document.getElementById("lifelineExpert").classList.add("used");

    usedExpert = true;

    // Highlight correct option button
    const buttons = document.querySelectorAll(".option-btn");
    buttons[correctIndex].classList.add("correct");
};

function useAudience() {
    if (usedAudience) return;

    const qData = questions[currentIndex];
    const correctIndex = qData.answerIndex;

    let percentages = [0, 0, 0, 0];
    percentages[correctIndex] = Math.floor(Math.random() * 31) + 45; // 45-75

    let remaining = 100 - percentages[correctIndex];
    const others = [0, 1, 2, 3].filter(i => i !== correctIndex);

    for (let i = 0; i < others.length; i++) {
        if (i < others.length - 1) {
            const maxGive = Math.max(1, Math.floor(remaining * 0.6));
            const value = Math.floor(Math.random() * maxGive);
            percentages[others[i]] = value;
            remaining -= value;
        } else {
            percentages[others[i]] = remaining;
        }
    }

    let sum = percentages.reduce((a, b) => a + b, 0);
    if (sum !== 100) {
        percentages[others[0]] += (100 - sum);
    }

    const letters = ["A", "B", "C", "D"];
    const pollBarsDiv = document.getElementById("pollBars");
    pollBarsDiv.innerHTML = "";

    const colorClasses = ["color-4", "color-1", "color-2", "color-3"];

    percentages.forEach((pct, i) => {
        // Short option preview (safe: don't insert raw html)
        const optionText = qData.options[i] ? qData.options[i] : "";

        const col = document.createElement("div");
        col.className = "v-bar-col";

        const percentEl = document.createElement("div");
        percentEl.className = "v-percent";
        percentEl.textContent = "0%"; // will animate

        const barWrap = document.createElement("div");
        barWrap.className = "v-bar " + colorClasses[i % colorClasses.length];
        // set target height as percent of a 180px max height
        const targetPx = Math.round((pct / 100) * 180); // max 180px visual
        barWrap.style.height = "0px";
        barWrap.setAttribute("data-target-px", targetPx);

        const label = document.createElement("div");
        label.className = "v-label";
        label.textContent = letters[i];

        const optionPreview = document.createElement("div");
        optionPreview.className = "v-option";
        optionPreview.textContent = optionText;

        col.appendChild(percentEl);
        col.appendChild(barWrap);
        col.appendChild(label);
        col.appendChild(optionPreview);

        pollBarsDiv.appendChild(col);

        // Small delay so each bar animates sequentially
    });

    // Show popup
    document.getElementById("audiencePopup").style.display = "flex";

    // Mark used and fade icon
    usedAudience = true;
    document.getElementById("lifelineAudience").classList.add("used");

    // Animate bars + numbers after a tiny tick
    requestAnimationFrame(() => {
        const cols = document.querySelectorAll(".v-bar-col");
        cols.forEach((col, idx) => {
            const bar = col.querySelector(".v-bar");
            const percentEl = col.querySelector(".v-percent");
            const targetPx = parseInt(bar.getAttribute("data-target-px"), 10);
            const pct = Math.round((targetPx / 180) * 100);

            // staggered animation delay
            const delay = idx * 120;

            setTimeout(() => {
                // expand height (CSS transition will animate it)
                bar.style.height = targetPx + "px";

                // reveal percent bubble
                col.classList.add("revealed");

                // animate numbers 0 → pct
                animateCounter(percentEl, 0, pct, 700);
            }, delay);
        });
    });
}

/* helper: animate number in element from start→end over duration (ms) */
function animateCounter(el, start, end, duration) {
    const startTime = performance.now();
    const step = (now) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const value = Math.floor(start + (end - start) * easeOutCubic(progress));
        el.textContent = value + "%";
        if (progress < 1) {
            requestAnimationFrame(step);
        } else {
            el.textContent = end + "%";
        }
    };
    requestAnimationFrame(step);
}
function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }

function updateLadder() {
    const items = document.querySelectorAll(".ladder li");

    items.forEach(li => {
        if (parseInt(li.dataset.index) === currentIndex) {
            li.classList.add("active-level");
        } else {
            li.classList.remove("active-level");
        }
    });
}


/* DOMContentLoaded */

document.addEventListener('DOMContentLoaded', async () => {

    await loadQuestionsFromAPI();
    initGame();

    const lockBtn = document.getElementById("lockBtn");
    const quitBtn = document.getElementById("quitBtn");

    lockBtn.disabled = true;

    lockBtn.addEventListener("click", lockAnswer);
    quitBtn.addEventListener("click", quitGame);

    const lifeline5050 = document.getElementById("lifeline5050");

    lifeline5050.addEventListener("click", use5050);

    const lifelineRefresh = document.getElementById("lifelineRefresh");
    lifelineRefresh.addEventListener("click", useRefresh);

    document.getElementById("lifelineExpert").addEventListener("click", useExpert);

    document.getElementById("closeExpert").addEventListener("click", () => {
        document.getElementById("expertPopup").style.display = "none";
    });

    document.getElementById("lifelineAudience").addEventListener("click", useAudience);
    document.getElementById("closeAudience").addEventListener("click", () => {
        document.getElementById("audiencePopup").style.display = "none";
    });

    document.addEventListener("click", () => {
        [...Object.values(sfx), ...correctSounds].forEach(a => {
            a.muted = true;
            a.play().then(() => a.pause()).finally(() => a.muted = false);
        });
    }, { once: true });

});


function lockAnswer() {
    console.log("LOCK PRESSED, selected:", selectedOption, "correct:", questions[currentIndex].answerIndex);
    stopTimer(); // stop counting

    const qData = questions[currentIndex];

    fadeOutBG();          // <<< 🔊 fade background music
    sfx.lock.play();      // <<< 🔊 lock sound immediately

    // All option buttons
    const buttons = document.querySelectorAll(".option-btn");

    // Highlight correct/wrong
    buttons.forEach((btn, i) => {
        if (i === qData.answerIndex) btn.classList.add("correct");
        if (i === selectedOption && i !== qData.answerIndex) btn.classList.add("wrong");
    });

    // Disable all buttons
    buttons.forEach(btn => (btn.disabled = true));

    document.getElementById("lockBtn").disabled = true;

    // WRONG ANSWER — GAME OVER
    if (selectedOption !== qData.answerIndex) {

        setTimeout(() => {
            // restart wrong sound from beginning
            sfx.wrong.currentTime = 0;
            sfx.wrong.play().catch(() => { });

            // wait for the sound to play, THEN go to gameover
            setTimeout(() => {
                window.location.href = "gameover.html?amount=" + safeAmount;
            }, 1800);   // adjust to match your wrong_answer.mp3 length

        }, 500);  // small pause after lock, optional

        return;
    }

    // CORRECT ANSWER
    setTimeout(() => {
        playRandomCorrectSound();

        currentIndex++;

        if (currentIndex < questions.length) {
            showQuestion();
        } else {
            sfx.finalWin.play();     
            window.location.href = "victory.html?amount=70000000";
        }

    }, 1500);
}

function quitGame() {
    Swal.fire({
        title: "Are you sure you want to quit?",
        text: "Your progress will be lost!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, quit",
        cancelButtonText: "No, continue",
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            window.location.href = "start.html";
        }
    });
}

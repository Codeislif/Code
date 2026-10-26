
/* =========================================
   RIZAL LEARNING HUB
   HTML + CSS + JAVASCRIPT
   Browser-based educational project
========================================= */

const DB = {
    users: "rizalHubUsers",
    modules: "rizalHubModules",
    records: "rizalHubRecords",
    session: "rizalHubSession"
};

function readData(key, fallback = []) {
    try {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : fallback;
    } catch {
        return fallback;
    }
}

function saveData(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[char]);
}

const defaultModules = [
    {
        id: 1,
        title: "Early Life and Childhood",
        description: "Discover Rizal's family, birthplace, and childhood.",
        content: `José Protasio Rizal Mercado y Alonso Realonda was born on June 19, 1861, in Calamba, Laguna, Philippines.

He was the seventh of eleven children of Francisco Mercado and Teodora Alonso Realonda. His family valued education, reading, and discipline.

Rizal showed an early interest in drawing, reading, and learning. His mother helped introduce him to stories and literature.

His early experiences and education helped shape his interest in Philippine society and the importance of knowledge.`
    },
    {
        id: 2,
        title: "Education and Intelligence",
        description: "Learn about his studies and academic achievements.",
        content: `Rizal studied in Biñan, Laguna, before continuing his education in Manila.

He attended the Ateneo Municipal de Manila and later studied at the University of Santo Tomas. He pursued medicine and specialized in ophthalmology, partly because he wanted to help his mother with her eyesight.

He continued his studies in Europe, including at the Universidad Central de Madrid. He also learned several languages and developed interests in literature, science, and the arts.

His dedication to education demonstrated his belief that knowledge could help people and society.`
    },
    {
        id: 3,
        title: "Noli Me Tangere",
        description: "Explore Rizal's first famous novel.",
        content: `Noli Me Tangere was published in Berlin, Germany, in 1887.

The novel exposed abuses and social problems in the Philippines during Spanish colonial rule. Its characters and events encouraged readers to reflect on injustice, inequality, and the need for change.

The title is commonly translated as "Touch Me Not." The book played an important role in awakening Filipino national consciousness.

Rizal used writing to encourage people to examine society and seek reforms.`
    },
    {
        id: 4,
        title: "El Filibusterismo",
        description: "Discover the sequel to Noli Me Tangere.",
        content: `El Filibusterismo, the sequel to Noli Me Tangere, was published in Ghent, Belgium, in 1891.

The story follows Simoun, the transformed identity of Crisostomo Ibarra. The novel presents a darker view of colonial society and explores injustice, revenge, and the consequences of oppression.

Together, Rizal's two novels became influential works in Philippine history and literature.`
    },
    {
        id: 5,
        title: "Travels and Exile in Dapitan",
        description: "Learn about Rizal's travels and community work.",
        content: `Rizal traveled to several countries to continue his studies and observe different societies.

In 1892, the Spanish colonial authorities exiled him to Dapitan, in Mindanao. During his years there, he practiced medicine, taught students, worked on community projects, and studied nature.

His work in Dapitan showed that education, health care, and practical service could improve community life.

He remained in Dapitan until 1896, when he was taken back into Spanish custody.`
    },
    {
        id: 6,
        title: "Legacy and National Heroism",
        description: "Understand Rizal's influence on the Philippines.",
        content: `José Rizal was executed by firing squad at Bagumbayan, now part of Rizal Park in Manila, on December 30, 1896.

His writings and advocacy for peaceful reform made him an important figure in the development of Filipino national consciousness.

Rizal is widely honored as the Philippine national hero. His life is commemorated through schools, monuments, books, and the annual observance of Rizal Day.

His legacy reminds students of the value of education, civic responsibility, courage, and love of country.`
    }
];

const quizQuestions = [
    {
        question: "When was José Rizal born?",
        options: ["June 19, 1861", "June 12, 1898", "December 30, 1896", "July 4, 1862"],
        answer: 0
    },
    {
        question: "Where was Rizal born?",
        options: ["Dapitan", "Calamba, Laguna", "Cebu City", "Vigan"],
        answer: 1
    },
    {
        question: "What was the title of Rizal's first famous novel?",
        options: ["El Filibusterismo", "Florante at Laura", "Noli Me Tangere", "Mi Ultimo Adios"],
        answer: 2
    },
    {
        question: "Which novel was the sequel to Noli Me Tangere?",
        options: ["El Filibusterismo", "La Solidaridad", "Fray Botod", "Urbana at Felisa"],
        answer: 0
    },
    {
        question: "What was Rizal's medical specialty?",
        options: ["Cardiology", "Pediatrics", "Dermatology", "Ophthalmology"],
        answer: 3
    },
    {
        question: "Where was Rizal exiled in 1892?",
        options: ["Madrid", "Dapitan", "Hong Kong", "Singapore"],
        answer: 1
    },
    {
        question: "Who was Rizal's mother?",
        options: ["Teodora Alonso", "Narcisa Rizal", "Josephine Bracken", "Gregoria de Jesus"],
        answer: 0
    },
    {
        question: "In which year was Noli Me Tangere published?",
        options: ["1872", "1891", "1887", "1896"],
        answer: 2
    },
    {
        question: "When was Rizal executed?",
        options: ["June 19, 1861", "August 30, 1896", "June 12, 1898", "December 30, 1896"],
        answer: 3
    },
    {
        question: "What was an important purpose of Rizal's writings?",
        options: [
            "To promote awareness and social reform",
            "To become a colonial governor",
            "To establish a trading empire",
            "To replace all schools with armies"
        ],
        answer: 0
    }
];

/* =========================================
   INITIAL SETUP
========================================= */

function initializeWebsite() {
    if (!localStorage.getItem(DB.users)) {
        saveData(DB.users, [
            {
                id: 1,
                name: "Demo Administrator",
                username: "admin",
                password: "admin123",
                role: "admin"
            },
            {
                id: 2,
                name: "Demo Student",
                username: "student",
                password: "student123",
                role: "student"
            }
        ]);
    }

    if (!localStorage.getItem(DB.modules)) {
        saveData(DB.modules, defaultModules);
    }

    if (!localStorage.getItem(DB.records)) {
        saveData(DB.records, []);
    }

    const user = getCurrentUser();

    if (user) {
        updateNavigation();
        showPage("home");
    } else {
        showPage("login");
    }
}

function getUsers() {
    return readData(DB.users, []);
}

function getModules() {
    return readData(DB.modules, []);
}

function getRecords() {
    return readData(DB.records, []);
}

function getCurrentUser() {
    const session = readData(DB.session, null);

    if (!session || !session.username) return null;

    return getUsers().find(user => user.username === session.username) || null;
}

function isAdmin() {
    return getCurrentUser()?.role === "admin";
}

function showPage(pageId) {
    const user = getCurrentUser();

    const publicPages = ["login", "register"];

    if (!publicPages.includes(pageId) && !user) {
        pageId = "login";
    }

    if (pageId === "admin" && !isAdmin()) {
        pageId = "home";
    }

    if (pageId === "records" && user?.role === "admin") {
        pageId = "admin";
    }

    document.querySelectorAll(".page").forEach(page => {
        page.classList.toggle("active", page.id === pageId);
    });

    document.getElementById("navigation").classList.remove("open");

    if (user) {
        updateNavigation();

        if (pageId === "home") renderHome();
        if (pageId === "modules") renderModules();
        if (pageId === "records") renderStudentRecords();
        if (pageId === "admin") renderAdmin();
    }
}

function toggleMenu() {
    document.getElementById("navigation").classList.toggle("open");
}

function updateNavigation() {
    const user = getCurrentUser();

    document.getElementById("adminNav").hidden = user?.role !== "admin";
    document.getElementById("recordsNav").hidden = user?.role !== "student";
    document.getElementById("logoutButton").hidden = !user;

    document.querySelectorAll("#navigation button").forEach(button => {
        if (button.id === "logoutButton") return;
        if (button.id === "adminNav") return;
        if (button.id === "recordsNav") return;

        button.hidden = !user;
    });
}

/* =========================================
   LOGIN AND REGISTRATION
========================================= */

function login(event) {
    event.preventDefault();

    const username = document.getElementById("loginUsername").value
        .trim().toLowerCase();

    const password = document.getElementById("loginPassword").value;

    const user = getUsers().find(account =>
        account.username.toLowerCase() === username &&
        account.password === password
    );

    const message = document.getElementById("loginMessage");

    if (!user) {
        message.textContent = "Invalid username or password.";
        return;
    }

    saveData(DB.session, { username: user.username });

    document.getElementById("loginPassword").value = "";
    message.textContent = "";

    updateNavigation();
    showPage("home");
}

function registerUser(event) {
    event.preventDefault();

    const name = document.getElementById("regName").value.trim();
    const username = document.getElementById("regUsername").value
        .trim().toLowerCase();
    const password = document.getElementById("regPassword").value;
    const message = document.getElementById("registerMessage");

    if (!/^[a-z0-9_.-]+$/.test(username)) {
        message.textContent =
            "Use only letters, numbers, dots, underscores, or hyphens.";
        return;
    }

    const users = getUsers();

    if (users.some(user => user.username.toLowerCase() === username)) {
        message.textContent = "That username is already taken.";
        return;
    }

    users.push({
        id: Date.now(),
        name,
        username,
        password,
        role: "student"
    });

    saveData(DB.users, users);

    document.getElementById("regName").value = "";
    document.getElementById("regUsername").value = "";
    document.getElementById("regPassword").value = "";

    message.style.color = "green";
    message.textContent = "Account created! You can now log in.";
}

function logout() {
    stopClockGame();
    saveData(DB.session, null);
    updateNavigation();
    showPage("login");
}

/* =========================================
   HOME PAGE AND LEARNING MODULES
========================================= */

function renderHome() {
    const modules = getModules();
    const user = getCurrentUser();

    const records = getRecords().filter(record =>
        record.username === user.username &&
        record.activity === "Quiz"
    );

    const best = records.length
        ? Math.max(...records.map(record => record.score))
        : 0;

    document.getElementById("homeModuleCount").textContent = modules.length;
    document.getElementById("homeBestScore").textContent = best + "%";

    document.getElementById("featuredModules").innerHTML =
        modules.slice(0, 3).map((module, index) => `
            <article class="module-card">
                <span class="module-number">${String(index + 1).padStart(2, "0")}</span>
                <h2>${escapeHTML(module.title)}</h2>
                <p>${escapeHTML(module.description)}</p>
                <button class="primary" onclick="openLesson(${Number(module.id)})">
                    Read Lesson →
                </button>
            </article>
        `).join("") || '<p class="empty-state">No lessons available yet.</p>';
}

function renderModules() {
    const modules = getModules();

    document.getElementById("moduleList").innerHTML = modules.map((module, index) => `
        <article class="module-card">
            <span class="module-number">${String(index + 1).padStart(2, "0")}</span>
            <h2>${escapeHTML(module.title)}</h2>
            <p>${escapeHTML(module.description)}</p>
            <button class="primary" onclick="openLesson(${Number(module.id)})">
                Read Lesson →
            </button>
        </article>
    `).join("") || '<p class="empty-state">No modules have been added.</p>';
}

function openLesson(id) {
    const module = getModules().find(item => item.id === id);

    if (!module) return;

    document.getElementById("lessonContent").innerHTML = `
        <p class="eyebrow">RIZAL LEARNING HUB</p>
        <h1>${escapeHTML(module.title)}</h1>
        <p class="muted">${escapeHTML(module.description)}</p>
        <div class="lesson-body">${escapeHTML(module.content)}</div>
        <div class="lesson-note">
            <strong>Learning tip:</strong>
            Take note of important names, places, dates, and events.
            You can test your knowledge in the quiz.
        </div>
        <br>
        <button class="primary" onclick="showPage('quiz')">Take the Quiz</button>
    `;

    showPage("lesson");
}

/* =========================================
   QUIZ AND STUDENT RECORDS
========================================= */

let activeQuiz = [];
let quizIndex = 0;
let quizScore = 0;
let quizAnswered = false;

function startQuiz() {
    stopClockGame();

    activeQuiz = shuffle(quizQuestions).slice(0, quizQuestions.length);
    quizIndex = 0;
    quizScore = 0;
    quizAnswered = false;

    showQuizQuestion();
}

function showQuizQuestion() {
    const area = document.getElementById("quizArea");

    if (quizIndex >= activeQuiz.length) {
        finishQuiz();
        return;
    }

    quizAnswered = false;
    const question = activeQuiz[quizIndex];

    area.innerHTML = `
        <div class="game-stats">
            <span>Question ${quizIndex + 1} of ${activeQuiz.length}</span>
            <span>Score: ${quizScore}</span>
        </div>
        <div class="game-question">${escapeHTML(question.question)}</div>
        <div class="game-options">
            ${question.options.map((option, index) => `
                <button class="game-option"
                    onclick="answerQuiz(${index})">
                    ${escapeHTML(option)}
                </button>
            `).join("")}
        </div>
        <p id="quizFeedback" class="feedback" aria-live="polite"></p>
        <button id="quizNext" class="primary" onclick="nextQuizQuestion()" hidden>
            Next Question →
        </button>
    `;
}

function answerQuiz(selected) {
    if (quizAnswered) return;
    quizAnswered = true;

    const question = activeQuiz[quizIndex];
    const buttons = document.querySelectorAll("#quizArea .game-option");
    const feedback = document.getElementById("quizFeedback");

    buttons.forEach(button => button.disabled = true);

    if (selected === question.answer) {
        quizScore++;
        feedback.textContent = "Correct! Well done.";
        feedback.style.color = "green";
    } else {
        feedback.textContent =
            "Not quite. Correct answer: " + question.options[question.answer];
        feedback.style.color = "#b33a3a";
    }

    document.getElementById("quizNext").hidden = false;
}

function nextQuizQuestion() {
    if (!quizAnswered) return;

    quizIndex++;
    showQuizQuestion();
}

function finishQuiz() {
    const total = activeQuiz.length;
    const percentage = Math.round((quizScore / total) * 100);
    const user = getCurrentUser();

    if (user) {
        const records = getRecords();

        records.push({
            id: Date.now(),
            username: user.username,
            name: user.name,
            activity: "Quiz",
            score: percentage,
            correct: quizScore,
            total,
            date: new Date().toLocaleString()
        });

        saveData(DB.records, records);
    }

    document.getElementById("quizArea").innerHTML = `
        <div class="game-symbol">${percentage >= 70 ? "🏆" : "📘"}</div>
        <h2>Quiz Completed!</h2>
        <p>You scored <strong>${quizScore} out of ${total}</strong>.</p>
        <h1>${percentage}%</h1>
        <p>${percentage >= 70
            ? "Excellent work! Keep learning about Rizal."
            : "Good effort! Review the lessons and try again."}</p>
        <button class="primary" onclick="startQuiz()">Try Again</button>
        <button class="secondary" onclick="showPage('records')">View My Records</button>
    `;
}

function renderStudentRecords() {
    const user = getCurrentUser();

    const records = getRecords().filter(record =>
        record.username === user.username
    );

    const scores = records.filter(record => record.activity === "Quiz")
        .map(record => record.score);

    const average = scores.length
        ? Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length)
        : 0;

    const best = scores.length ? Math.max(...scores) : 0;

    document.getElementById("recordAttempts").textContent = scores.length;
    document.getElementById("recordAverage").textContent = average + "%";
    document.getElementById("recordBest").textContent = best + "%";

    document.getElementById("studentRecordTable").innerHTML = records.length
        ? records.slice().reverse().map(record => `
            <tr>
                <td>${escapeHTML(record.date)}</td>
                <td>${escapeHTML(record.activity)}</td>
                <td>${record.score}% (${record.correct ?? "-"} / ${record.total ?? "-"})</td>
            </tr>
        `).join("")
        : '<tr><td colspan="3" class="empty-state">No records yet. Try the quiz!</td></tr>';
}

/* =========================================
   ADMIN MODULE MANAGEMENT
========================================= */

function addModule(event) {
    event.preventDefault();

    if (!isAdmin()) return;

    const title = document.getElementById("newModuleTitle").value.trim();
    const description = document.getElementById("newModuleDescription").value.trim();
    const content = document.getElementById("newModuleContent").value.trim();

    if (!title || !description || !content) return;

    const modules = getModules();

    modules.push({
        id: Date.now(),
        title,
        description,
        content
    });

    saveData(DB.modules, modules);

    document.getElementById("newModuleTitle").value = "";
    document.getElementById("newModuleDescription").value = "";
    document.getElementById("newModuleContent").value = "";

    renderAdmin();
}

function deleteModule(id) {
    if (!isAdmin()) return;
    if (!confirm("Delete this learning module?")) return;

    saveData(DB.modules, getModules().filter(module => module.id !== id));
    renderAdmin();
}

function deleteStudent(username) {
    if (!isAdmin()) return;

    if (username === getCurrentUser().username) {
        alert("You cannot delete the account you are currently using.");
        return;
    }

    const users = getUsers();
    const target = users.find(user => user.username === username);

    if (!target || target.role !== "student") {
        alert("Only student accounts can be deleted here.");
        return;
    }

    if (!confirm("Delete this student account and their quiz records?")) return;

    saveData(DB.users, users.filter(user => user.username !== username));
    saveData(DB.records, getRecords().filter(record =>
        record.username !== username
    ));

    renderAdmin();
}

function renderAdmin() {
    if (!isAdmin()) return;

    const users = getUsers();
    const modules = getModules();
    const records = getRecords();
    const students = users.filter(user => user.role === "student");

    document.getElementById("adminStudentCount").textContent = students.length;
    document.getElementById("adminModuleCount").textContent = modules.length;
    document.getElementById("adminAttemptCount").textContent =
        records.filter(record => record.activity === "Quiz").length;

    document.getElementById("adminModuleList").innerHTML = modules.length
        ? modules.map(module => `
            <div class="admin-item">
                <div>
                    <strong>${escapeHTML(module.title)}</strong>
                    <p>${escapeHTML(module.description)}</p>
                </div>
                <button class="danger" onclick="deleteModule(${Number(module.id)})">
                    Delete
                </button>
            </div>
        `).join("")
        : '<p class="empty-state">No modules available.</p>';

    document.getElementById("adminStudentTable").innerHTML = users.map(user => `
        <tr>
            <td>${escapeHTML(user.name)}</td>
            <td>${escapeHTML(user.username)}</td>
            <td>${escapeHTML(user.role)}</td>
            <td>${user.role === "student"
                ? `<button class="danger" onclick="deleteStudent('${escapeHTML(user.username)}')">Delete</button>`
                : "Protected"}
            </td>
        </tr>
    `).join("");

    document.getElementById("adminRecordTable").innerHTML = records.length
        ? records.slice().reverse().map(record => `
            <tr>
                <td>${escapeHTML(record.name || record.username)}</td>
                <td>${escapeHTML(record.activity)}</td>
                <td>${record.score}%</td>
                <td>${escapeHTML(record.date)}</td>
            </tr>
        `).join("")
        : '<tr><td colspan="4" class="empty-state">No quiz records yet.</td></tr>';
}

/* =========================================
   SHARED GAME HELPERS
========================================= */

function shuffle(items) {
    const result = [...items];

    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
    }

    return result;
}

function gameArea() {
    return document.getElementById("gameArea");
}

function stopClockGame() {
    if (clockInterval !== null) {
        clearInterval(clockInterval);
        clockInterval = null;
    }
}

/* =========================================
   MINI GAME 1: RIZAL TRIVIA
========================================= */

let triviaQuestions = [];
let triviaIndex = 0;
let triviaScore = 0;
let triviaAnswered = false;

function startTrivia() {
    stopClockGame();

    triviaQuestions = shuffle(quizQuestions);
    triviaIndex = 0;
    triviaScore = 0;

    showTriviaQuestion();
}

function showTriviaQuestion() {
    if (triviaIndex >= triviaQuestions.length) {
        gameArea().innerHTML = `
            <div class="game-symbol">🎉</div>
            <h2>Trivia Completed!</h2>
            <h1>${triviaScore}/${triviaQuestions.length}</h1>
            <p>Great job learning about Dr. José Rizal!</p>
            <button class="primary" onclick="startTrivia()">Play Again</button>
        `;
        return;
    }

    triviaAnswered = false;

    const question = triviaQuestions[triviaIndex];

    gameArea().innerHTML = `
        <h2>🧠 Rizal Trivia Challenge</h2>
        <div class="game-stats">
            <span>Question ${triviaIndex + 1}/${triviaQuestions.length}</span>
            <span>Score: ${triviaScore}</span>
        </div>
        <div class="game-question">${escapeHTML(question.question)}</div>
        <div class="game-options">
            ${question.options.map((option, index) => `
                <button class="game-option"
                    onclick="answerTrivia(${index})">
                    ${escapeHTML(option)}
                </button>
            `).join("")}
        </div>
        <p id="triviaFeedback" class="feedback"></p>
        <button id="triviaNext" class="primary" onclick="nextTrivia()" hidden>
            Next →
        </button>
    `;
}

function answerTrivia(selected) {
    if (triviaAnswered) return;
    triviaAnswered = true;

    const question = triviaQuestions[triviaIndex];
    const feedback = document.getElementById("triviaFeedback");

    document.querySelectorAll("#gameArea .game-option")
        .forEach(button => button.disabled = true);

    if (selected === question.answer) {
        triviaScore++;
        feedback.textContent = "Correct! ⭐";
        feedback.style.color = "green";
    } else {
        feedback.textContent =
            "Correct answer: " + question.options[question.answer];
        feedback.style.color = "#b33a3a";
    }

    document.getElementById("triviaNext").hidden = false;
}

function nextTrivia() {
    if (!triviaAnswered) return;
    triviaIndex++;
    showTriviaQuestion();
}

/* =========================================
   MINI GAME 2: MEMORY MATCH
========================================= */

let memoryCards = [];
let memoryFirst = null;
let memoryLocked = false;
let memoryMatches = 0;
let memoryMoves = 0;

function startMemory() {
    stopClockGame();

    const pairs = [
        ["1861", "Birth year"],
        ["Calamba", "Birthplace"],
        ["Noli Me Tangere", "First novel"],
        ["El Filibusterismo", "Sequel novel"],
        ["Dapitan", "Place of exile"],
        ["Teodora Alonso", "Mother"],
        ["Ophthalmology", "Medical specialty"],
        ["1896", "Year of execution"]
    ];

    memoryCards = shuffle(pairs.flatMap((pair, index) => [
        { pairId: index, text: pair[0], revealed: false, matched: false },
        { pairId: index, text: pair[1], revealed: false, matched: false }
    ]));

    memoryFirst = null;
    memoryLocked = false;
    memoryMatches = 0;
    memoryMoves = 0;

    renderMemory();
}

function renderMemory() {
    gameArea().innerHTML = `
        <h2>🃏 Memory Match</h2>
        <p>Match each fact with the related name, place, or description.</p>
        <div class="game-stats">
            <span>Moves: ${memoryMoves}</span>
            <span>Pairs: ${memoryMatches}/8</span>
        </div>
        <div class="memory-grid">
            ${memoryCards.map((card, index) => `
                <button class="memory-card ${card.matched ? "matched" : ""}"
                    onclick="flipMemory(${index})"
                    ${card.matched ? "disabled" : ""}>
                    ${card.matched || card.revealed
                        ? escapeHTML(card.text)
                        : "❔"}
                </button>
            `).join("")}
        </div>
        <p id="memoryFeedback" class="feedback"></p>
        <button class="primary" onclick="startMemory()">Restart Game</button>
    `;
}

function flipMemory(index) {
    if (memoryLocked) return;

    const card = memoryCards[index];

    if (card.matched || card.revealed) return;

    card.revealed = true;

    if (memoryFirst === null) {
        memoryFirst = index;
        renderMemory();
        return;
    }

    const firstIndex = memoryFirst;
    const firstCard = memoryCards[firstIndex];

    memoryMoves++;

    if (firstCard.pairId === card.pairId) {
        firstCard.matched = true;
        card.matched = true;
        memoryMatches++;
        memoryFirst = null;

        renderMemory();

        if (memoryMatches === 8) {
            gameArea().insertAdjacentHTML(
                "beforeend",
                "<h3>🏆 You matched every pair!</h3><p>Excellent memory!</p>"
            );
        }
    } else {
        memoryLocked = true;
        renderMemory();

        setTimeout(() => {
            memoryCards[firstIndex].revealed = false;
            memoryCards[index].revealed = false;
            memoryFirst = null;
            memoryLocked = false;
            renderMemory();
        }, 900);
    }
}

/* =========================================
   MINI GAME 3: BEAT THE CLOCK
========================================= */

let clockInterval = null;
let clockQuestions = [];
let clockIndex = 0;
let clockScore = 0;
let clockTime = 30;
let clockAnswered = false;

function startClockGame() {
    stopClockGame();

    clockQuestions = shuffle(quizQuestions);
    clockIndex = 0;
    clockScore = 0;
    clockTime = 30;

    showClockQuestion();

    clockInterval = setInterval(() => {
        clockTime--;

        const timer = document.getElementById("clockTimer");

        if (timer) {
            timer.textContent = clockTime;
        }

        if (clockTime <= 0) {
            finishClockGame();
        }
    }, 1000);
}

function showClockQuestion() {
    if (clockTime <= 0) return;

    if (clockIndex >= clockQuestions.length) {
        clockQuestions = shuffle(quizQuestions);
        clockIndex = 0;
    }

    clockAnswered = false;

    const question = clockQuestions[clockIndex];

    gameArea().innerHTML = `
        <h2>⏱️ Beat the Clock</h2>
        <div class="game-stats">
            <span>Time: <strong id="clockTimer">${clockTime}</strong>s</span>
            <span>Score: ${clockScore}</span>
        </div>
        <div class="game-question">${escapeHTML(question.question)}</div>
        <div class="game-options">
            ${question.options.map((option, index) => `
                <button class="game-option"
                    onclick="answerClock(${index})">
                    ${escapeHTML(option)}
                </button>
            `).join("")}
        </div>
        <p id="clockFeedback" class="feedback"></p>
    `;
}

function answerClock(selected) {
    if (clockAnswered || clockTime <= 0) return;

    clockAnswered = true;

    const question = clockQuestions[clockIndex];
    const feedback = document.getElementById("clockFeedback");

    document.querySelectorAll("#gameArea .game-option")
        .forEach(button => button.disabled = true);

    if (selected === question.answer) {
        clockScore++;
        feedback.textContent = "Correct! +1 point";
        feedback.style.color = "green";
    } else {
        feedback.textContent = "Not quite! Keep going.";
        feedback.style.color = "#b33a3a";
    }

    clockIndex++;

    setTimeout(() => {
        if (clockTime > 0 && clockInterval !== null) {
            showClockQuestion();
        }
    }, 450);
}

function finishClockGame() {
    stopClockGame();

    gameArea().innerHTML = `
        <div class="game-symbol">⏰</div>
        <h2>Time's Up!</h2>
        <h1>${clockScore} points</h1>
        <p>You answered questions under pressure. Try again to beat your score!</p>
        <button class="primary" onclick="startClockGame()">Play Again</button>
    `;
}

/* START THE WEBSITE */
initializeWebsite();

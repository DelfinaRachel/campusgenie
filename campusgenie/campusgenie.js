// --- 1. AI Assistant Logic ---
function handleAIQuery() {
    const input = document.getElementById('ai-input');
    const display = document.getElementById('ai-display');
    const question = input.value.toLowerCase();

    if (!question.trim()) return;

    // Add user message
    display.innerHTML += `<p class="user-msg">${input.value}</p>`;
    
    // Logic processing
    let response = "I'm still learning. Try asking about 'printing', 'food', or 'study'.";
    
    if (question.includes("print")) response = "⚡ Laser printers available in Central Library (Level 1).";
    if (question.includes("food") || question.includes("eat")) response = "🍱 Cafeteria B is serving Sushi today. Block C has $5 bowls!";
    if (question.includes("study")) response = "🤫 Level 4 North Wing is currently a Quiet Zone.";
    if (question.includes("gym")) response = "💪 Campus Gym is open 6AM - 10PM. Peak hours start at 5PM.";

    // Typing effect simulation
    setTimeout(() => {
        display.innerHTML += `<p class="bot-msg"><strong>Genie:</strong> ${response}</p>`;
        display.scrollTop = display.scrollHeight;
        updateCampusLevel(5); // Reward usage
    }, 500);

    input.value = "";
}

// --- 2. Map Info Logic ---
const locations = {
    library: "Open 24/7 during finals. 50+ Macs available in the basement.",
    cafeteria: "Best Value: 'Student Special' at Stall 4. Accepts CampusPay.",
    bus: "Shuttles arrive every 15 mins. Track live on the Genie App.",
    clinic: "Open 9AM-5PM. Free basic checkups for all valid ID holders."
};

function showMapInfo(loc) {
    const box = document.getElementById('map-details');
    box.style.opacity = 0;
    setTimeout(() => {
        box.innerHTML = `<strong>${loc.toUpperCase()}:</strong> ${locations[loc]}`;
        box.style.opacity = 1;
    }, 200);
}

// --- 3. Budget Logic ---
function processBudget() {
    const food = parseFloat(document.getElementById('food-cost').value) || 0;
    const transport = parseFloat(document.getElementById('transport-cost').value) || 0;
    const resultDiv = document.getElementById('budget-result');

    const total = food + transport;
    let tips = "✨ Budget looking solid!";
    
    if (food > 20) tips = "💡 Tip: Meal prep on Sundays to save ~$50/week.";
    if (transport > 10) tips = "💡 Tip: Use the free campus shuttle to cut transport costs.";

    resultDiv.innerHTML = `
        <div class="tip-highlight">
            Daily Est: $${total.toFixed(2)}<br>
            Monthly Est: $${(total * 30).toFixed(2)}<br>
            <small>${tips}</small>
        </div>
    `;
    updateCampusLevel(10);
}

// --- 4. Schedule Logic ---
const scheduleTips = [
    "Free hour detected: Perfect for a 20-min power nap.",
    "No classes? Head to the library before it gets crowded.",
    "Remember to stay hydrated between lectures!",
    "Post-class review increases retention by 40%."
];

function addSchedule() {
    const input = document.getElementById('task-input');
    const list = document.getElementById('schedule-list');
    const tipBox = document.getElementById('schedule-tip');

    if (!input.value) return;

    const li = document.createElement('li');
    li.textContent = `🔹 ${input.value}`;
    li.style.listStyle = "none";
    li.style.marginBottom = "5px";
    list.appendChild(li);
    
    input.value = "";
    tipBox.innerText = scheduleTips[Math.floor(Math.random() * scheduleTips.length)];
}

// --- 5. Rotating Survival Tips ---
const survivalTips = [
    "Floor 3 of Library has the fastest Wi-Fi.",
    "The vending machine in Block D is always 50c cheaper.",
    "Tuesday is 'Free Coffee' morning at the Student Hub.",
    "Need a nap? The nap pods in the Clinic are underrated."
];

let tipIndex = 0;
function rotateTips() {
    const tipEl = document.getElementById('rotating-tip');
    tipEl.style.opacity = 0;
    setTimeout(() => {
        tipEl.innerText = survivalTips[tipIndex];
        tipEl.style.opacity = 1;
        tipIndex = (tipIndex + 1) % survivalTips.length;
    }, 500);
}
setInterval(rotateTips, 4000);

// --- 6. Gamification: Campus Level ---
let xp = 0;
function updateCampusLevel(amount) {
    xp += amount;
    const levelDisplay = document.getElementById('campus-level');
    if (xp > 100) levelDisplay.innerText = "LEVEL: CAMPUS LEGEND";
    else if (xp > 50) levelDisplay.innerText = "LEVEL: CAMPUS PRO";
    else if (xp > 20) levelDisplay.innerText = "LEVEL: CAMPUS NAVIGATOR";
}

// Initialize first tip
rotateTips();
/* ---------- Data ---------- */
const roadmapData = [
  { level: 1, title: 'Level 1: Basics', tasks: ['Hello World & setup','Variables & types','Input/Output','Operators','Simple program'] },
  { level: 2, title: 'Level 2: Flow Control', tasks: ['If / else','Switch','For loop','While loop','Break & continue'] },
  { level: 3, title: 'Level 3: Functions & Scope', tasks: ['Function basics','Parameters & return','Scope & lifetime','Recursion intro','Header files'] },
  { level: 4, title: 'Level 4: Arrays & Pointers', tasks: ['Arrays intro','Strings','Pointers basics','Pointer arithmetic','Memory pitfalls'] },
  { level: 5, title: 'Level 5: Advanced C', tasks: ['Structures','File I/O','Dynamic memory','Preprocessor','Common bugs'] },
];

const flashcardsData = [
  { q: 'What is a pointer?', a: 'A variable that stores the memory address of another variable.' },
  { q: 'Difference between = and == ?', a: '= is assignment; == is equality comparison.' },
  { q: 'Which header provides printf?', a: '<stdio.h> provides printf/scanf.' },
  { q: 'What is segmentation fault?', a: 'Accessing memory you don’t own (invalid pointer dereference).' },
  { q: 'Declare array of 10 ints', a: 'int arr[10];' }
];

const leaderboardData = [
  { rank:1, name:'Priya', id:'NG1021', score:320 },
  { rank:2, name:'Sahil', id:'NG1034', score:295 },
  { rank:3, name:'Riya', id:'NG1052', score:270 },
  { rank:4, name:'Aashu', id:'NG1060', score:250 },
  { rank:5, name:'Karan', id:'NG1078', score:220 },
];

const profileData = {
  name: 'Aashu',
  score: 250,
  rank: 4,
  level: 2,
  streak: 3,
  tasksDone: 9,
  xpPercent: 48
};

/* ---------- Navigation helper ---------- */
function goToPage(page){
  window.location.href = page;
}

/* ---------- Learn page renderer ----------
*/
function populateLearnRoadmap(containerId = 'roadmap') {
  const container = document.getElementById(containerId);
  if(!container) return;
  container.innerHTML = ''; // clear

  roadmapData.forEach(l => {
    const lvl = document.createElement('div');
    lvl.className = 'level';
    lvl.style.background = 'rgba(255,255,255,0.02)';
    lvl.style.padding = '12px';
    lvl.style.borderRadius = '10px';
    lvl.style.marginBottom = '10px';
    lvl.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center">
        <div style="font-weight:700;color:#eae6ff">Level ${l.level}: ${l.title}</div>
        <div style="font-size:13px;color:var(--muted)">(${l.tasks.length} topics)</div>
      </div>
      <div class="tasks" style="margin-top:8px;display:none"></div>
    `;
    const tasksDiv = lvl.querySelector('.tasks');
    l.tasks.forEach((t, i) => {
      const tdiv = document.createElement('div');
      tdiv.className = 'task';
      tdiv.style.padding = '8px';
      tdiv.style.borderRadius = '8px';
      tdiv.style.marginTop = '6px';
      tdiv.style.display = 'flex';
      tdiv.style.justifyContent = 'space-between';
      tdiv.style.alignItems = 'center';
      tdiv.innerHTML = `<div class="tname">${i+1}. ${t}</div><button class="task-btn" aria-label="Open task">Open</button>`;
      // clicking the whole task toggles done class locally
      tdiv.querySelector('.task-btn').addEventListener('click', (ev) => {
        ev.stopPropagation();
        // For demo: open a simple alert or new page — keeping simple, show an overlay/alert
        alert(`Open task: "${t}" — here you can show the lesson content.`);
      });
      tasksDiv.appendChild(tdiv);
    });

    // toggle on level click
    lvl.addEventListener('click', (e) => {
      // prevent toggling when clicking button inside
      if(e.target && e.target.closest('.task-btn')) return;
      tasksDiv.style.display = tasksDiv.style.display === 'block' ? 'none' : 'block';
    });

    container.appendChild(lvl);
  });
}

/* ---------- Flashcards renderer ----------
   If flashcards.html loads, render cards dynamically.
*/
function populateFlashcards(containerId = 'cardsGrid') {
  const grid = document.getElementById(containerId);
  if(!grid) return;
  grid.innerHTML = '';
  flashcardsData.forEach(c => {
    const btn = document.createElement('button');
    btn.className = 'flashcard';
    btn.setAttribute('tabindex','0');
    btn.setAttribute('aria-pressed','false');
    btn.innerHTML = `
      <div class="card-inner">
        <div class="card-front"><div class="card-q">${c.q}</div></div>
        <div class="card-back"><div class="card-a">${c.a}</div></div>
      </div>
    `;
    // toggle flip
    function toggle(){
      const pressed = btn.classList.toggle('is-flipped');
      btn.setAttribute('aria-pressed', pressed ? 'true' : 'false');
      btn.focus();
    }
    btn.addEventListener('click', (e) => { e.preventDefault(); toggle(); });
    btn.addEventListener('keydown', (e) => { if(e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); } });
    grid.appendChild(btn);
  });
}

/* ---------- Leaderboard renderer ----------
   If leaderboard.html loads and has tbody with id 'leaderBody'
*/
function populateLeaderboard(tableBodyId = 'leaderBody') {
  const tbody = document.getElementById(tableBodyId);
  if(!tbody) return;
  tbody.innerHTML = '';
  leaderboardData.forEach(row => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${row.rank}</td><td>${row.name}</td><td>${row.id}</td><td>${row.score}</td>`;
    tbody.appendChild(tr);
  });
}

/* ---------- Profile renderer ----------
   If profile.html has elements with matching IDs, populate them
*/
function populateProfile() {
  const nameEl = document.getElementById('pname');
  if(nameEl) nameEl.textContent = profileData.name;
  const scoreEl = document.getElementById('p-score');
  if(scoreEl) scoreEl.textContent = profileData.score;
  const rankEl = document.getElementById('p-rank');
  if(rankEl) rankEl.textContent = profileData.rank;
  const levelEl = document.getElementById('p-level');
  if(levelEl) levelEl.textContent = profileData.level;
  const streakEl = document.getElementById('p-streak');
  if(streakEl) streakEl.textContent = profileData.streak;
  const doneEl = document.getElementById('p-done');
  if(doneEl) doneEl.textContent = profileData.tasksDone;
  const xpBar = document.getElementById('xp-bar');
  if(xpBar) { xpBar.style.width = profileData.xpPercent + '%'; xpBar.textContent = profileData.xpPercent + '%'; }
}


/* ---------- Auto-run on pages that include the script ---------- */
document.addEventListener('DOMContentLoaded', () => {
  populateLearnRoadmap();   // safe no-op if roadmap container missing
  populateFlashcards();     // safe no-op
  populateLeaderboard();    // safe no-op
  populateProfile();        // safe no-op
});

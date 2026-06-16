// ─── Retrieve & clamp a grade input ──────────────────────────────────────────
const getVal = (name) => {
  if (!name) return 0;
  const el = document.querySelector(`input[name='${CSS.escape(name)}']`);
  if (!el || el.value === '') return 0;
  return Math.min(20, Math.max(0, parseFloat(el.value)));
};

// ─── Subject average (DS×0.3 + Ex×0.7 | TP×0.3 + Ex×0.7 | DS×0.2 + TP×0.2 + Ex×0.6) ─
const subjectAvg = (s) => {
  const ds = getVal(s.ds), ex = getVal(s.ex), tp = getVal(s.tp);
  const hasDs = s.ds !== null && s.ds !== undefined;
  const hasEx = s.ex !== null && s.ex !== undefined;
  const hasTp = s.tp !== null && s.tp !== undefined;

  if (hasDs && hasTp && hasEx) return ds * 0.2 + tp * 0.2 + ex * 0.6;
  if (hasDs && hasEx) return ds * 0.3 + ex * 0.7;
  if (hasTp && hasEx) return tp * 0.3 + ex * 0.7;
  if (hasTp) return tp;  // only TP (e.g. Projet Personnel Professionnel)
  return ex;
};

// ─── Recalculate all averages ─────────────────────────────────────────────────
let currentProgram = null;

const computeAverages = () => {
  if (!currentProgram) return;
  let semAvgs = [];
  currentProgram.semesters.forEach((sem, idx) => {
    let total = 0, coeffSum = 0;
    sem.subjects.forEach(s => {
      total    += subjectAvg(s) * s.coeff;
      coeffSum += s.coeff;
    });
    const avg = total / coeffSum;
    semAvgs.push(avg);
    const id = idx === 0 ? 'average' : 'average2';
    document.getElementById(id).textContent = avg.toFixed(2);
  });
  const year = semAvgs.reduce((a, b) => a + b, 0) / semAvgs.length;
  document.getElementById('year-average').textContent = year.toFixed(2);
};

// ─── Build one subject row ────────────────────────────────────────────────────
const subjectRow = (s) => {
  const dsCell = s.ds
    ? `<input type="number" name="${s.ds}" class="matiere" min="0" max="20" step="0.25">`
    : `<div class="empty-cell"></div>`;
  const exCell = s.ex
    ? `<input type="number" name="${s.ex}" class="matiere" min="0" max="20" step="0.25">`
    : `<div class="empty-cell"></div>`;
  const tpCell = s.tp
    ? `<input type="number" name="${s.tp}" class="matiere" min="0" max="20" step="0.25">`
    : `<div class="empty-cell"></div>`;
  return `
    <span class="subject-label">${s.label}</span>
    ${dsCell}
    ${exCell}
    ${tpCell}`;
};
// ─── Render a full program ────────────────────────────────────────────────────
const renderProgram = (program) => {
  currentProgram = program;
  document.title = `${program.label} – INSAT Grade Calculator`;
  document.getElementById('showing').textContent = `📌 Currently showing: ${program.label}`;

  // Pre-select the dropdowns
  const yearSel  = document.getElementById('StudyYear');
  const fieldSel = document.getElementById('StudyField');
  yearSel.value = program.year;
  if (typeof updateSelection === 'function') updateSelection();
  fieldSel.value = program.field;

  // Build semester cards
const container = document.getElementById('semesters-container');

// 1. Extract your semester data safely
const sem1 = program.semesters[0];
const sem2 = program.semesters[1];

// 2. Build HTML for Semester 1 (if it exists)
if (sem1) {
  container.insertAdjacentHTML('beforeend', `
    <div class="semester-card">
      <h2>📘 ${sem1.label}</h2>
      <div class="grade-grid">
        <div class="grade-header"></div>
        <div class="grade-header">DS</div>
        <div class="grade-header">Examen</div>
        <div class="grade-header">TP</div>
        ${sem1.subjects.map(subjectRow).join('')}
      </div>
    </div>
    <div class="average-card1 ">
      <div class="average-label">${sem1.label} Average</div>
      <div class="average-value" id="average">0.00</div>
    </div>
  `);
}

// 3. Build HTML for Semester 2 (if it exists)
if (sem2) {
  container.insertAdjacentHTML('beforeend', `
    <div class="semester-card">
      <h2>📗 ${sem2.label}</h2>
      <div class="grade-grid">
        <div class="grade-header"></div>
        <div class="grade-header">DS</div>
        <div class="grade-header">Examen</div>
        <div class="grade-header">TP</div>
        ${sem2.subjects.map(subjectRow).join('')}
      </div>
    </div>
    <div class="average-card2">
      <div class="average-label">${sem2.label} Average</div>
      <div class="average-value" id="average2">0.00</div>
    </div>
  `);
}
  // Year average block
  container.insertAdjacentHTML('beforeend', `
    <div class="year-average">
      <div class="average-label">Year Average</div>
      <div class="average-value" id="year-average">0.00</div>
    </div>`);

  // Attach listeners
  document.querySelectorAll('input[type="number"]').forEach(el => {
    el.addEventListener('input', computeAverages);
  });
};

// ─── Boot: read ?p= param and render ─────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  const key     = new URLSearchParams(window.location.search).get('p') ?? '';
  const program = PROGRAMS[key];

  if (!program) {
    document.getElementById('semesters-container').innerHTML = `
      <div class="semester-card" style="text-align:center; padding: 3rem 2rem;">
        <div style="font-size:3rem; margin-bottom:1rem;">🚧</div>
        <h2 style="color:#1e293b; margin-bottom:.5rem;">${key || 'Unknown'} – Coming Soon</h2>
        <p style="color:#475569;">This program hasn't been added yet. Check back later!</p>
        <a href="landing.html" style="display:inline-block; margin-top:1.5rem; color:#4f6ef7; font-weight:600;">← Back to Home</a>
      </div>`;
    document.getElementById('showing').textContent = `📌 ${key || '?'} – Not available yet`;
    return;
  }

  renderProgram(program);
});

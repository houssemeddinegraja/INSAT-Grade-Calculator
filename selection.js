// ─── Populate the field dropdown based on selected year ──────────────────────
const updateSelection = () => {
  const year      = document.getElementById('StudyYear').value;
  const fieldSel  = document.getElementById('StudyField');

  if (year === '1') {
    fieldSel.innerHTML = `
      <option value="none">Select Field</option>
      <option value="MPI">MPI</option>
      <option value="CBA">CBA</option>`;
  } else if (['2','3','4','5'].includes(year)) {
    fieldSel.innerHTML = `
      <option value="none">Select Field</option>
      <option value="GL">GL</option>
      <option value="RT">RT</option>
      <option value="IMI">IMI</option>
      <option value="IIA">IIA</option>
      <option value="CH">CH</option>
      <option value="BIO">BIO</option>`;
  } else {
    fieldSel.innerHTML = `<option value="none">Select Year First</option>`;
  }
};

// Listen for year changes (used on landing page; on calculator page
// the year is set programmatically so updateSelection is called directly)
const yearEl = document.getElementById('StudyYear');
if (yearEl) yearEl.addEventListener('change', updateSelection);

// ─── Navigate to the right calculator page ───────────────────────────────────
const load = () => {
  const year  = document.getElementById('StudyYear').value;
  const field = document.getElementById('StudyField').value;

  if (year === 'none' || field === 'none') {
    alert('Please select a year and a field first :)');
    return;
  }

  // Build the program key: year-1 fields keep their name (MPI / CBA),
  // year-2+ fields get the year appended (GL2, RT3, IIA4 …)
  const key = year === '1' ? field : `${field}${year}`;
  window.location.href = `calculator.html?p=${key}`;
};

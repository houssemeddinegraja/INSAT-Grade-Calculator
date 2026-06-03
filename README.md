# INSAT Grade Calculator

A lightweight, client-side web app that lets [INSAT](https://insat.rnu.tn) students calculate their actual semester averages or estimate them based on predicted grades — no login, no server, no install.

---

## What it does

You pick your year and major, enter your grades (DS, Examen, TP) for each subject, and the app instantly computes:

- **Semester 1 average**
- **Semester 2 average**
- **Year average**

Grades are weighted per subject using the official INSAT formula:
- DS + Examen → `DS × 0.3 + Exam × 0.7`
- Examen + TP → `TP × 0.3 + Exam × 0.7`
- DS + Examen + TP → `DS × 0.2 + TP × 0.2 + Exam × 0.6`

Subject averages are then combined using each subject's official coefficient from the website's study plan.

---

## Supported programs

| Year | Programs |
|------|----------|
| 1st (MPI track) | MPI |
| 1st (CBA track) | CBA |
| 2nd (MPI track) | GL2, RT2, IIA2, IMI2 |
| 2nd (CBA track) | CH2, BIO2 |
| 3rd (MPI track) | GL3, RT3, IIA3, IMI3 |
| 4th (MPI track) | GL4, RT4, IIA4, IMI4 |

> It should be noted that no information has been provided when it comes to Chemistry/Biology Tracks for 3rd and 4th years, so I tried relying on the good old study plan in INSAT's official website, but a lot of changes occured between its time (2022) and today, so with no additional info acquired, I am unable to add the missing tracks, but I would be happy to welcome any contribution to the data file.

---

## Project structure

```
├── landing.html       # Entry point — year & major selector
├── calculator.html    # Single calculator page (rendered dynamically)
├── calculator.js      # Rendering engine + grade calculation logic
├── data.js            # All program configs (subjects, coefficients, DS/TP flags)
├── selection.js       # Dropdown logic + navigation
└── style.css          # Shared styles
```

No frameworks, no dependencies, no build step — just open `landing.html` in a browser.

---

## Adding a new program

Everything lives in `data.js`: each class and each level, each with both semesters, detailed coefficients and controlled input (whether the subject has a "DS", "TP" or not), according to the following pattern:
```js
'CH3': {
  label: 'CH3', year: '3', field: 'CH',
  semesters: [
    { label: 'Semester 1', subjects: [
      { label: 'Subject name', coeff: 3, ds: 'SubjectDS', ex: 'SubjectEx', tp: 'SubjectTP' },
      { label: 'Exam only',    coeff: 2, ds: null,        ex: 'ExamEx',    tp: null },
      // ...
    ]},
    { label: 'Semester 2', subjects: [ /* ... */ ]},
  ]
},
```
## Contributing
 
Data corrections, missing programs, and UI improvements are all welcome. Open an issue or a PR

---

*Built for INSAT students, by an INSAT student.*

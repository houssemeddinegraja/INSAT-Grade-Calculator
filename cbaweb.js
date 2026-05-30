const sem1Config = [
    {coeff: 3.5, ds: "MathsDS", ex: "MathsEx", tp: null},          // no TP
    {coeff: 3,   ds: "Info1DS", ex: "Info1Ex", tp: "Info1TP"},      // has TP
    {coeff: 3,   ds: "ElecStatDS", ex: "ElecStatEx", tp: "ElecStatTP"},
    {coeff: 3,   ds: "OptiqueDS", ex: "OptiqueEx", tp: "OptiqueTP"},
    {coeff: 6,   ds: "ChimieGenDS", ex: "ChimieGenEx", tp: "ChimieGenTP"},
    {coeff: 5,   ds: "BioCellDS", ex: "BioCellEx", tp: "BioCellTP"},
    {coeff: 2,   ds: "GenetiqueDS", ex: "GenetiqueEx", tp: null},   // no TP
    {coeff: 1.5, ds: "AnglaisDS", ex: "AnglaisEx", tp: null},
    {coeff: 1.5, ds: "FrançaisDS", ex: "FrançaisEx", tp: null},
    {coeff: 1.5, ds: "EcoDS", ex: "EcoEx", tp: null}
];

const sem2Config = [
    {coeff: 3,   ds: "StatsDS", ex: "StatsEx", tp: null},
    {coeff: 2,   ds: "Info2DS", ex: "Info2Ex", tp: "Info2TP"},
    {coeff: 3,   ds: "MecaGenDS", ex: "MecaGenEx", tp: "MecaGenTP"},
    {coeff: 3,   ds: "MecaFluDS", ex: "MecaFluEx", tp: "MecaFluTP"},
    {coeff: 3,   ds: "AtomeDS", ex: "AtomeEx", tp: null},
    {coeff: 3,   ds: "ReactNSPDS", ex: "ReactNSPEx", tp: "ReactNSPTP"},
    {coeff: 4.5, ds: "ChimieOrgDS", ex: "ChimieOrgEx", tp: "ChimieOrgTP"},
    {coeff: 4,   ds: "BiochimieDS", ex: "BiochimieEx", tp: null},
    {coeff: 1.5, ds: "Anglais2DS", ex: "Anglais2Ex", tp: null},
    {coeff: 1.5, ds: "Français2DS", ex: "Français2Ex", tp: null},
    {coeff: 1.5, ds: "DroitDS", ex: "DroitEx", tp: null}
];
const recupererInput = (inputName) => {
    if (inputName === null || inputName === undefined) return 0;
    const input = document.querySelector(`input[name='${inputName}']`);
    if (!input || input.value === "") return 0;
    let val = parseFloat(input.value);
    if (val < 0) val = 0;
    if (val > 20) val = 20;
    return val;
};

const calculMoyMatiere = (subject) => {
    let ds = recupererInput(subject.ds);
    let ex = recupererInput(subject.ex);
    let tp = recupererInput(subject.tp);
    if (subject.ds && subject.tp && subject.ex) {
        return (ds * 0.2) + (tp * 0.2) + (ex * 0.6);
    } else if (!subject.ds && subject.tp && subject.ex) {
        return (tp * 0.3) + (ex * 0.7);
    } else if (subject.ds && !subject.tp && subject.ex) {
        return (ds * 0.3) + (ex * 0.7);
    }
    return ex;
};

const MoyTot = () => {
    let totalScoreS1 = 0, totalCoeffS1 = 0;
    sem1Config.forEach(subject => {
        totalScoreS1 += calculMoyMatiere(subject) * subject.coeff;
        totalCoeffS1 += subject.coeff;
    });
    let averageS1 = totalScoreS1 / totalCoeffS1;
    document.querySelector("#average").innerText = averageS1.toFixed(2);

    let totalScoreS2 = 0, totalCoeffS2 = 0;
    sem2Config.forEach(subject => {
        totalScoreS2 += calculMoyMatiere(subject) * subject.coeff;
        totalCoeffS2 += subject.coeff;
    });
    let averageS2 = totalScoreS2 / totalCoeffS2;
    document.querySelector("#average2").innerText = averageS2.toFixed(2);

    let yearAverage = (averageS1 + averageS2) / 2;
    document.querySelector("#year-average").innerText = yearAverage.toFixed(2);
};

document.querySelectorAll("input[type='number']").forEach(input => {
    input.addEventListener('input', MoyTot);
});

const sem1Config = [
    { coeff: 3,   ds: "AnalyseDS", ex: "AnalyseEx", tp: null },
    { coeff: 3,   ds: "AlgebreDS", ex: "AlgebreEx", tp: null },
    { coeff: 3,   ds: "Algo I DS", ex: "Algo I Ex", tp: null },
    { coeff: 1.5, ds: "AnglaisDS", ex: "AnglaisEx", tp: null },
    { coeff: 3.5, ds: "CircuitsDS", ex: "CircuitsEx", tp: "CircuitsTP" },
    { coeff: 1.5, ds: "DroitDS", ex: "DroitEx", tp: null },
    { coeff: 3.5, ds: "ElectrostatiqueDS", ex: "ElectrostatiqueEx", tp: "ElectrostatiqueTP" },
    { coeff: 1.5, ds: "FrançaisDS", ex: "FrançaisEx", tp: null },
    { coeff: 3.5, ds: "MécaniqueDS", ex: "MécaniqueEx", tp: null },
    { coeff: 3.5, ds: "OptiqueDS", ex: "OptiqueEx", tp: "OptiqueTP" },
    { coeff: 2.5, ds: null, ex: "ProgrammationEx", tp: "ProgrammationTP" } 
];

const sem2Config = [
    { coeff: 3,   ds: "Analyse2DS", ex: "Analyse2Ex", tp: null },
    { coeff: 3,   ds: "Algebre2DS", ex: "Algebre2Ex", tp: null },
    { coeff: 3,   ds: "Algo II DS", ex: "Algo II Ex", tp: null },
    { coeff: 1.5, ds: "Anglais2DS", ex: "Anglais2Ex", tp: null },
    { coeff: 1.5, ds: "EconomieDS", ex: "EconomieEx", tp: null },
    { coeff: 3,   ds: "ElectromagnétismeDS", ex: "ElectromagnétismeEx", tp: null },
    { coeff: 3.5, ds: "ElectroniqueDS", ex: "ElectroniqueEx", tp: "ElectroniqueTP" },
    { coeff: 1.5, ds: "Français2DS", ex: "Français2Ex", tp: null },
    { coeff: 3.5, ds: "Systèmes LogiquesDS", ex: "Systèmes LogiquesEx", tp: "Systèmes LogiquesTP" },
    { coeff: 4,   ds: "ThermodynamiqueDS", ex: "ThermodynamiqueEx", tp: "ThermodynamiqueTP" },
    { coeff: 2.5, ds: null, ex: "Programmation2Ex", tp: "Programmation2TP" }
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
    } 
    else if (!subject.ds && subject.tp && subject.ex) {
        return (tp * 0.3) + (ex * 0.7);
    } 
    else if (subject.ds && !subject.tp && subject.ex) {
        return (ds * 0.3) + (ex * 0.7);
    }
    return ex;
};

const MoyTot = () => {
    let totalScoreS1 = 0;
    let totalCoeffS1 = 0;

    sem1Config.forEach(subject => {
        totalScoreS1 += calculMoyMatiere(subject) * subject.coeff;
        totalCoeffS1 += subject.coeff;
    });

    let averageS1 = totalScoreS1 / totalCoeffS1;
    document.querySelector("#average").innerText = averageS1.toFixed(2);

    let totalScoreS2 = 0;
    let totalCoeffS2 = 0;

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
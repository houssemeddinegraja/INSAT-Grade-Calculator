const sem1Config = [
    {coeff: 2, ds: "ADODS", ex:"ADOEx", tp:null},
    {coeff: 1.5, ds: "AnglaisDS", ex: "AnglaisEx", tp: null},
    {coeff: 1.5, ds:"FrançaisDS", ex:"FrançaisEx", tp:null},
    {coeff: 1.5, ds: "GestionDS", ex: "GestionEx", tp: null},
    {coeff: 3, ds: "POODS", ex: "POOEx", tp: "POOTP"},
    {coeff: 3, ds: "ProbaDS", ex: "ProbaEx", tp: null},
    {coeff: 3, ds: "MDS", ex:"MEx", tp: null},
    {coeff: 3, ds: "ARDS", ex: "AREx", tp: "ARTP"},
    {coeff: 3, ds:"ElectroniqueDS", ex:"ElectroniqueEx", tp: "ElectroniqueTP"},
    {coeff: 3, ds:"SEDS", ex:"SEEx", tp: null},
    {coeff: 2, ds: null, ex: "CPPEx", tp: "CPPTP"},
    {coeff: 2, ds: null, ex: "PythonEx", tp: "PythonTP"}
];

const sem2Config = [
    {coeff: 3, ds: "AlgebreDS", ex:"AlgebreEx", tp:null},
    {coeff: 3, ds: "AnalyseDS", ex: "AnalyseEx", tp: null},
    {coeff: 3, ds: "RéseauxDS", ex: "RéseauxEx", tp: "RéseauxTP"},
    {coeff: 1.5, ds:"Anglais2DS", ex:"Anglais2Ex", tp:null},
    {coeff: 1, ds: "ComptaDS", ex: "ComptaEx", tp: null},
    {coeff: 2, ds: "OndesDS", ex: "OndesEx", tp: null},
    {coeff: 1, ds: "DroitDS", ex: "DroitEx", tp: null},
    {coeff: 3, ds: "BDDDS", ex:"BDDEx", tp: "BDDTP"},
    {coeff: 3, ds: "TeleDS", ex: "TeleEx", tp: "TeleTP"},
    {coeff: 2, ds: null, ex: "JavaEx", tp: "JavaTP"},
    {coeff: 2, ds:null, ex:"WEBEx", tp: "WEBTP"},
    {coeff: 2, ds: null, ex: "UnixEx", tp: "UnixTP"},
    {coeff: 2, ds: "TransmissionDS", ex: "TransmissionEx", tp: null}
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
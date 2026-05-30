const sem1Config = [
    {coeff: 3,   ds: "MathsDS", ex: "MathsEx", tp: null},                     // no TP
    {coeff: 4,   ds: "MethBioDS", ex: "MethBioEx", tp: "MethBioTP"},          // has TP
    {coeff: 2.5, ds: "InfoIndusDS", ex: "InfoIndusEx", tp: "InfoIndusTP"},    // has TP
    {coeff: 4,   ds: "MicroGenDS", ex: "MicroGenEx", tp: "MicroGenTP"},       // has TP
    {coeff: 3,   ds: "MicroAppDS", ex: "MicroAppEx", tp: "MicroAppTP"},       // has TP
    {coeff: 3.5, ds: "BioMetabDS", ex: "BioMetabEx", tp: "BioMetabTP"},       // has TP
    {coeff: 2.5, ds: "BioMolDS", ex: "BioMolEx", tp: null},                   // no TP (TP=0)
    {coeff: 4.5, ds: "BioAnimDS", ex: "BioAnimEx", tp: "BioAnimTP"},          // has TP
    {coeff: 1.5, ds: "AnglaisDS", ex: "AnglaisEx", tp: null},
    {coeff: 1.5, ds: "ComptaDS", ex: "ComptaEx", tp: null}
];

const sem2Config = [
    {coeff: 2.5, ds: "BioVegDS", ex: "BioVegEx", tp: "BioVegTP"},             // has TP
    {coeff: 3,   ds: "PhysioVegDS", ex: "PhysioVegEx", tp: "PhysioVegTP"},    // has TP
    {coeff: 3.5, ds: "BioAlimDS", ex: "BioAlimEx", tp: "BioAlimTP"},          // has TP
    {coeff: 3,   ds: "GenieAlimDS", ex: "GenieAlimEx", tp: null},             // no TP
    {coeff: 4,   ds: "MicroIndusDS", ex: "MicroIndusEx", tp: "MicroIndusTP"}, // has TP
    {coeff: 4,   ds: "ImmunoDS", ex: "ImmunoEx", tp: "ImmunoTP"},             // has TP
    {coeff: 3.5, ds: "AnalyseBioDS", ex: "AnalyseBioEx", tp: null},           // no TP
    {coeff: 1.5, ds: "FroidDS", ex: "FroidEx", tp: null},                     // no TP
    {coeff: 1.5, ds: "Anglais2DS", ex: "Anglais2Ex", tp: null},
    {coeff: 1.5, ds: "Français2DS", ex: "Français2Ex", tp: null},
    {coeff: 1,   ds: "GestionDS", ex: "GestionEx", tp: null},
    {coeff: 1,   ds: "DroitDS", ex: "DroitEx", tp: null}
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

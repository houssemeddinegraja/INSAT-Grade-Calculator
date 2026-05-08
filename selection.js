const studyYear = document.querySelector("#StudyYear");
const studyField = document.querySelector("#StudyField");

const updateSelection = () => {

    const year = studyYear.value;
    
    switch (year) {
        case "1":
            studyField.innerHTML = `
                <option value="none">Select Field</option>
                <option value="MPI">MPI</option>
                <option value="CBA">CBA</option>
            `; 
            break;
            
        case "2":
        case "3":
        case "4":
        case "5":
            studyField.innerHTML = `
                <option value="none">Select Field</option>
                <option value="GL">GL</option>
                <option value="RT">RT</option>
                <option value="IMI">IMI</option>
                <option value="IIA">IIA</option>
                <option value="CH">CH</option>
                <option value="BIO">BIO</option>
            `;
            break;
            
        default:
            studyField.innerHTML = `
                <option value="none">Select Year First</option>
            `;
            break;
    }
}

studyYear.addEventListener("change", updateSelection);


const load = () => {
    const year = studyYear.value;
    const field = studyField.value;
    const showing = document.querySelector("#showing");
    if (year === "none" || field === "none") {
        alert("Select Year and Field Please :)");
        return;
    }
    if (year === "1") {
        if (field === "MPI") {
            let pageLink = document.createElement("a");
            pageLink.setAttribute("href", "mpiweb.html");
            pageLink.click();
        } else if (field === "CBA") {
            let pageLink = document.createElement("a");
            pageLink.setAttribute("href", "cbaweb.html");
            pageLink.click();
        }
    } else {
        switch (field) {
            case "GL":
                pageLink = document.createElement("a");
                pageLink.setAttribute("href", "gl2web.html");
                pageLink.click();
                break;
            case "RT":
                pageLink = document.createElement("a");
                pageLink.setAttribute("href", "rt2web.html");
                pageLink.click();
                break;
            case "IMI":
                pageLink = document.createElement("a");
                pageLink.setAttribute("href", "imi2web.html");
                pageLink.click();
                break;
            case "IIA":
                pageLink = document.createElement("a");
                pageLink.setAttribute("href", "iia2web.html");
                pageLink.click();
                break;
            case "CH":
                pageLink = document.createElement("a");
                pageLink.setAttribute("href", "ch2web.html");
                pageLink.click();
                break;
            case "BIO":
                pageLink = document.createElement("a");
                pageLink.setAttribute("href", "bio2web.html");
                pageLink.click();
                break;
        }
    }
}

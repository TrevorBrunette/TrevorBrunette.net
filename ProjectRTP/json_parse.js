const JSONfilename = "AllTransferCoursesBySchool.json";
const versionFilename = "json-version";
const filepath = "/ProjectRTP/";

let JSONfile = JSON.parse(localStorage.getItem("jsonData"));
let localVersion = localStorage.getItem("jsonVersion");
let webVersion = "";
let lastQuery = "";


console.log("Found localVersion: " + localVersion);
onLoad();

function onLoad() {
    fetchVersion();
}

function onClick() {
    queryAndReplace();
}

function checkVersion() {
    if(localVersion === null || webVersion === ""){
        console.log("Version not cached. Caching version.");
        if(webVersion === ""){
            console.log("Bye af");
        } else if(webVersion === localVersion) {
            console.log("Found webVersion equal to localVersion: " + webVersion);
        } else {
            console.log("Found webVersion: " + webVersion + " where localVersion: " + localVersion + ". Updating...");
            localVersion = webVersion;
            fetchJSON();
        }
    } else if(JSONfile === null){
        console.log("JSON file not present. Fetching new JSON.");
        fetchJSON();
    } else {
        console.log("Version file and JSON file found.");
    }
}

function fetchVersion() {
    fetch(filepath+versionFilename)
        .then(version => {
            version.text().then((result_text) => {
                webVersion = result_text;
                console.log("Found webVersion: " + webVersion);
                window.localStorage.setItem("jsonVersion", webVersion);
                checkVersion();
            });

        }).catch((reason) => {
        console.log("Failed to get version: " + reason);
    });
}

function fetchJSON() {
    fetch(filepath+JSONfilename)
        .then(response => response.json())
        .then(data => {
            console.log("We got JSON");
            JSONfile = data;
            window.localStorage.setItem("jsonData", JSON.stringify(JSONfile));
        }).catch((reason) => {
        console.log("Failed to get JSON: " + reason);
    });
}

function fetchJSONAndRun() {
    fetch(filepath+JSONfilename)
        .then(response => response.json())
        .then(data => {
            console.log("We got JSON");
            JSONfile = data;
            window.localStorage.setItem("jsonData", JSON.stringify(JSONfile));
            queryAndReplace();
        }).catch((reason) => {
        console.log("Failed to get JSON: " + reason);
    });
}

function queryAndReplace() {
    let query = document.getElementById("button-input").value;
    if(query !== lastQuery && query !== null && !(query.length===0)){
        removeAllChildNodes(document.getElementById("search-content"));
        modify_document(query);
        lastQuery = query;
    }
}

function modify_document(query) {
    let result = queryJSON(query,'rpi_id');
    document.getElementById("search-count").innerText = "Found " + result.length + " matches for " + query + ".";
    for(let i = 0; i < result.length; i++) {
        let div = document.createElement("div");
        div.innerHTML = "<p>School: " + result[i][0] + ", " + result[i][2]
            + "<br>Transfer Class Title: " + result[i][1].other_school_title + "<br>Transfer Class ID: " + result[i][1].other_school_id
            + "<br>RPI Class: " + result[i][1].rpi_title + "<br>RPI Class ID: " + result[i][1].rpi_id
            + "<br>Credits at RPI: " + result[i][1].rpi_credits + "</p>";
        document.getElementById("search-content").appendChild(div);
    }
}

function queryJSON(query,query_type = 'rpi_id') {
    let matches = [];
    try {
        let content = JSONfile;
        console.log(query);
        for (let i = 0; i < content.schools.length; ++i) {
            for (let j = 0; j < content.schools[i].courses.length; ++j) {
                const course = content.schools[i].courses[j];
                const school = content.schools[i].name;
                const state = content.schools[i].state;

                let attribute = course.rpi_id;
                if(query_type === 'rpi_id'){
                    attribute = course.rpi_id;
                } else if(query_type === 'rpi_title'){
                    attribute = course.rpi_title;
                } else if(query_type === 'school'){
                    attribute = school;
                } else if(query_type === 'location'){
                    attribute = state;
                }

                if (attribute.toUpperCase().includes(query.toUpperCase())) {
                    //console.log("\n" + school + ":");
                    //console.log(course)
                    matches.push([school, course, state]);
                }
            }
        }
        console.log("Matches: " + matches.length);
    } catch (err) {
        console.log('Failed to search JSON file', err);
    }
    return matches;
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}
let lastQuery = "";

function onClick(){
    let query = document.getElementById("button-input").value.toUpperCase();
    if(query !== lastQuery && query !== null && !(query.length===0)){
        removeAllChildNodes(document.getElementById("search-content"));
        lastQuery = query;
        modify_document(query);
    }
}

function queryJSON_rpiID(query_id){
    let matches = [];
    try {
        let rawdata = GetJson();
        let content = JSON.parse(rawdata);
        console.log(query_id);
        for (let i = 0; i < content.schools.length; ++i) {
            for (let j = 0; j < content.schools[i].courses.length; ++j) {
                const course = content.schools[i].courses[j];
                if (course.rpi_id.includes(query_id)) {
                    const school = content.schools[i].name;
                    console.log("\n" + school + ":");
                    console.log(course)
                    matches.push([school, course]);
                }
            }
        }
        console.log("\nMatches: " + matches.length);
    } catch (err) {
        console.log('Failed to search JSON file', err);
    }

    return matches;
}

function modify_document(query){
    let result = queryJSON_rpiID(query);
    document.getElementById("search-count").innerText = "Found " + result.length + " matches for " + query + ".";
    for(let i = 0; i < result.length; i++) {
        let div = document.createElement("div");
        div.innerHTML = "<p>School: " + result[i][0] + "<br>Class Title: " + result[i][1].other_school_title
            + "<br>Class ID: " + result[i][1].other_school_id + "<br>RPI Course: " + result[i][1].rpi_title
            + "<br>RPI Course ID: " + result[i][1].rpi_id + "<br>Credits at RPI: " + result[i][1].rpi_credits + "</p>";
        document.getElementById("search-content").appendChild(div);
    }
}

function GetJson(){
    const filename = "AllTransferCoursesBySchool.json";
    var Httpreq = new XMLHttpRequest(); // a new request
    Httpreq.open("GET", "/"+filename ,false);
    Httpreq.send(null);
    return Httpreq.responseText;
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function search(event) {
    if(event.key === 'Enter') {
        onClick();
    }
}
let aboutPath = "/ProjectRTP/README";
let pageText = "";

fetchAbout();

function fetchAbout() {
    fetch(aboutPath)
        .then(response => {
            response.text().then((result_text) => {
                pageText = result_text;
                setPageText();
            });
        }).catch((reason) => {
        console.log("Failed to get page text: " + reason);
        pageText = "Failed to load page. try again later.";
        setPageText();
    });
}

function setPageText() {
    let node = document.createElement("P");
    node.innerText = pageText;
    document.getElementById("text-into").appendChild(node);
}
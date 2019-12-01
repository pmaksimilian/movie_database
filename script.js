let key = "f9f1ff70";

let baseUrl =  `http://www.omdbapi.com/?apikey=${key}&`;

let input = document.getElementById("search");
let button = document.getElementById("searchBTN");
let resultContainer = document.getElementById("resultContainer");


button.addEventListener("click", function(event) {
    let query = input.value;

    showResults(1, query);
    
});

function showResults(page, query) {
    let url = baseUrl + `s=${query}&page=${page}`;
    getRequest(url, function (response){
        
        resultContainer.innerHTML = "";

        let results = response.Search;
        results.forEach(function (element) {
            let resultTitle = document.createElement("p");
            let resultItem = document.createElement("div");
            let resultImage = document.createElement("img");            

            resultItem.setAttribute("class", "movie");
            resultTitle.setAttribute("class", "movieName");

            resultImage.setAttribute("src", element.Poster);
            resultImage.setAttribute("width", "150px");

            resultTitle.innerHTML = `${element.Title} (${element.Year})`;
           
            resultItem.appendChild(resultTitle);
            resultItem.appendChild(resultImage);

            resultContainer.appendChild(resultItem);
        });

        let pagination = document.getElementById("pagination");
        pagination.innerHTML = "";

        let numberOfResults = response.totalResults;

        let pages = parseInt(numberOfResults / 10) + 1;

        for (let i = 1; i <= pages; i++) {
            let onePage = document.createElement("span");
            onePage.innerHTML = `${i} `;
            onePage.addEventListener("click", function(event) {
                showResults(i, query);
            });
            pagination.appendChild(onePage);
        }
    });
}

function getRequest(url, callback) {
    xhttpRequest("GET", url, callback);
}

function postRequest(url, callback) {
    xhttpRequest("POST", url, callback);
}

function putRequest(url, callback) {
    xhttpRequest("PUT", url, callback);
}

function xhttpRequest(method, url, callback){
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4) {
            if (this.status === 200) {
                callback(
                    JSON.parse(
                        this.response
                    )
                )
            } else {
                console.log(
                    "Error: "
                    + "Status code: " + this.status
                    + "Something went wrong!"
                );
            }
        }
    }

    
    xhttp.open("GET", url, true);
    xhttp.send();
}


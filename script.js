//Initial References
let movieTitleRef = document.getElementById("movie-name");
let searchBtn = document.getElementById("search-btn");
let result = document.getElementById("result");
let spin = document.getElementById("spin");


//Function to fetch data from API
const getMovie = async () => {
    //apply spinner class to the button during data fetching
    // spin.setAttribute("class", "lds-hourglass");

    let movieTitle = movieTitleRef.value;
    let url = `https://www.omdbapi.com/?apikey=${API_KEY}&t=${movieTitle}`;

    console.log("movieTitle", movieTitle);
    //If input field is empty
    if (movieTitle.length <= 0) {
        result.innerHTML = `<h3 class="msg">Please Enter A Movie Title</h3>`;
        spin.classList.remove("lds-hourglass");
    }
    else {
        searchBtn.innerHTML = "Searching...";
        searchBtn.disabled = true;
        const response = await fetch(url);
        const data = await response.json();
        console.log("data", data);
        //If movie exists in database
        try {
            if (data.Response === "True") {
                console.log("data.response", data.Response);
                result.innerHTML = `
                <div class="info">
                    <img src=${data.Poster} class="poster" alt="Movie Poster">
                    <div>
                        <h2>${data.Title}</h2>
                        <div class="rating">
                            <img src="star-icon.svg" alt="Movie Rating">
                            <h4>${data.imdbRating}</h4>
                        </div>
                        <div class="details">
                            <span>${data.Rated}</span>
                            <span>${data.Year}</span>
                            <span>${data.Runtime}</span>
                        </div>
                        <div class="genre">
                            <div>${data.Genre.split(",").join("</div><div>")}</div>
                        </div>
                    </div>
                </div>
                <h3>Plot:</h3>
                <p>${data.Plot}</p>
                <h3>Cast:</h3>
                <p>${data.Actors}</p> 
            `;
            } else {
                result.innerHTML = `<h3 class="msg">Movie Not Found</h3>`;
            }
        } catch (Error) {
            console.log("error", Error);
            result.innerHTML = `<h3 class='msg'>${Error}</h3>`;
        }
        finally {
            searchBtn.innerHTML = "Search";
            searchBtn.disabled = false;
        }
    }

    return false;
};
searchBtn.addEventListener("click", getMovie);
window.addEventListener("load", getMovie);

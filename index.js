//API link by search(https://www.omdbapi.com/?s=spiderman&apikey=e9603691)

const searchBox = document.getElementById("movie-search-box");
const searchList = document.getElementById("search-list");
const resultGrid = document.getElementById("result-grid");

// get movie data from api

async function getMovieData(searchName) {
  const URL = `https://www.omdbapi.com/?s=${searchName}&apikey=e9603691`;

  const res = await fetch(`${URL}`);
  const data = await res.json();
  // console.log(data);
  if (data.Response == "True") {
    displayMovieList(data.Search);
  }
}

function searchMovie() {
  let searchName = searchBox.value.trim();
  if (searchName.length > 0) {
    searchList.classList.remove("hide-search-list");
    getMovieData(searchName);
  } else {
    searchList.classList.add("hide-search-list");
  }
}
function displayMovieList(movies) {
  searchList.innerHTML = "";
  for (let i = 0; i < movies.length; i++) {
    let movieListitem = document.createElement("div");
    // console.log(movieListitem);
    movieListitem.dataset.id = movies[i].imdbID;
    movieListitem.classList.add("search-list-item");
    if (movies[i].poster != "N/A") {
      moviePoster = movies[i].Poster;
    } else {
      moviePoster = "image_not_found.png";
    }
    movieListitem.innerHTML = `
        <div class="search-item-thumbnail">
            <img src="${moviePoster}" alt="movie-poster" />
        </div>
        <div class="search-item-info">
            <h3>${movies[i].Title}</h3>
            <p>${movies[i].Year}</p>
        </div>
    `;
    searchList.appendChild(movieListitem);
  }
}

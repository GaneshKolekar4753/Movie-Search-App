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
  loadMovieDetalis();
}

function loadMovieDetalis() {
  const searchListMovies = searchList.querySelectorAll(".search-list-item");
  // console.log(searchListMovies);
  searchListMovies.forEach((movie) => {
    // console.log(movie);
    movie.addEventListener("click", async () => {
      const movieId = movie.dataset.id;
      // console.log(movieId);
      searchList.classList.add("hide-search-list"); //sraech list is hide using this class
      searchBox.value = "";
      //calling movie details api using id search(http://www.omdbapi.com/?i=tt0944947&apikey=e9603691)

      const res = await fetch(
        `http://www.omdbapi.com/?i=${movieId}&apikey=e9603691`
      );
      const movieDetails = await res.json();

      displayMovieResults(movieDetails);
    });
  });
}

//add dynamiyic movie result in result grid class
function displayMovieResults(details) {
    console.log(details)
  resultGrid.innerHTML = `
  <div class="movie-poster">
  <img src="${(details.Poster!='N/A')?details.Poster :'image_not_found.png'}" alt="movie-poster" />
</div>
<div class="movie-info">
  <h3 class="movie-title">${details.Title}</h3>
  <ul class="movie-misc-info">
    <li class="year">Year: ${details.Year}</li>
    <li class="rated">Ratings: ${details.imdbRating}</li>
    <li class="released">Released: ${details.Released}</li>
  </ul>
  <p class="genre"><b>Genre:</b> ${details.Genre}</p>
  <p class="writer">
    <b>Writer:</b> ${details.Writer}
  </p>
  <p class="actors">
    <b>Actors: </b>${details.Actors}
  </p>
  <p class="plot">
    <b>Plot:</b> ${details.Plot}
  </p>
  <p class="language"><b>Language:</b> ${details.Language}</p>
  <p class="awards">
    <b><i class="fas fa-award"></i></b> ${details.Awards}
  </p>
</div>
    `;
}

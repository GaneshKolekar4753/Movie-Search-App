//API link by search(https://www.omdbapi.com/?s=spiderman&apikey=e9603691)

const searchBox = document.getElementById("movie-search-box");
const searchList = document.getElementById("search-list");
const resultGrid = document.getElementById("result-grid");
const continer = document.querySelector(".fav-list");
const favBtn = document.querySelector(".fav-btn");
let favList = [];

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
        `https://www.omdbapi.com/?i=${movieId}&apikey=e9603691`
      );
      const movieDetails = await res.json();

      displayMovieResults(movieDetails);

      // add favourite
      document.getElementById("fav-icon").addEventListener("click", () => {
        if (favList.indexOf(movieDetails) == -1) {
          favList.push(movieDetails);
          document.getElementById("fav-icon").style.color = "#d4aa11";
        }
      });
    });
  });
}

//add dynamiyic movie result in result grid class
function displayMovieResults(details) {
  console.log(details);
  resultGrid.innerHTML = `
  <div class="movie-poster">
  <img src="${
    details.Poster != "N/A" ? details.Poster : "image_not_found.png"
  }" alt="movie-poster" />
</div>
<div class="movie-info">
  <div class="fav-icon" id='fav-icon'><i class="fa-solid fa-heart"></i></div>
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

//function to display favourite movies
let i = 1;
function diaplayFavMovie() {
  console.log("favList", favList);
  if (i == 1) {
    const favMovie = document.createElement("h2");
    favMovie.textContent = "Favourite movies";
    favMovie.className = "fav-move-heading";
    favMovie.dataset.id = "fav-movie-heading";
    document.querySelector(".fav-list").append(favMovie);
    i++;
  }
  // adding favourite movies in fav list
  let listlength = favList.length;
  if (listlength == 0) {
    return;
  }
  for (let index = 0; index < listlength; index++) {
    let FavmovieListitem = document.createElement("div");
    FavmovieListitem.dataset.id = `unfavourite${favList[index].imdbID}`;
    FavmovieListitem.classList.add("fav-list-item");
    if (favList[index].poster != "N/A") {
      moviePoster = favList[index].Poster;
    } else {
      moviePoster = "image_not_found.png";
    }
    FavmovieListitem.innerHTML = `
    <div class="fav-item-thumbnail">
    
      <img src="${moviePoster}" alt="movie-poster" />
     </div>
    <div class="fav-item-info"> 
      <h3>${favList[index].Title}</h3>
      <p>${favList[index].Year}</p>
    </div>
    <div class="unfavourite", id="unfavourite${
      favList[index].imdbID + 1
    }"><i class="fa-solid fa-heart"></i></div>
    `;
    continer.appendChild(FavmovieListitem);
  }
  favList = [];
  // handling unfavourite event to remove item
  const unFavourite = document.querySelectorAll(".unfavourite");
  const movies = document.querySelectorAll(".fav-list-item");
  unFavourite.forEach((favbtn) => {
    favbtn.addEventListener("click", async () => {
      const favbtnId = favbtn.getAttribute("id");
      const favItem = document.querySelectorAll(".fav-list-item");
      favItem.forEach((item) => {
        const favItemId = item.getAttribute("data-id");
        if (favbtnId == favItemId + 1) {
          item.remove();
        }
      });
    });
  });
}

//event Listner
document.querySelector(".fav-btn").addEventListener("click", diaplayFavMovie);

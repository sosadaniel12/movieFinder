$(document).ready(function () {
  $("#searchButton").click("submit", (e) => {
    let searchText = $("#searchText").val();
    getMovies(searchText);
    e.preventDefault();
  });
});

mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (
    document.body.scrollTop > 180 ||
    document.documentElement.scrollTop > 180
  ) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

function getMovies(searchText) {
  axios
    .get("https://www.omdbapi.com?s=" + searchText + "&apikey=f32c5430")
    .then((response) => {
      console.log(response);
      let movies = response.data.Search;
      let output = "";
      $.each(movies, (index, movie) => {
        output += `
          <div class="col-md-3">
          <div class="well text-center">
          <div class="contain">
          <img src="${movie.Poster}">
          <div class="middle">
          <h3 class="title">${movie.Title}</h3>
          </div>
          <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" id="resultBtn"href="#">Movie Details</a>
          </div>
          </div>
          </div>
          `;
      });
      topFunction();
      scrollFunction();
      $("#movies").html(output);
    })
    .catch((error) => {
      console.log(error);
    });
}

function movieSelected(id) {
  sessionStorage.setItem("movieId", id);
  window.location = "movie.html";
  return false;
}

function getMovie() {
  let movieId = sessionStorage.getItem("movieId");

  axios
    .get("https://www.omdbapi.com?i=" + movieId + "&apikey=f32c5430")
    .then((response) => {
      console.log(response);
      let movie = response.data;

      let output = `
        <div class="row">
            <div class="col-md-4">
                <img src="${movie.Poster}" class="thumbnail">
            </div>
            <div class="col-md-8">
                <h2>${movie.Title}</h2>
                <ul class="list-group">
                    <li class="list-group-item"><strong>Genre:</strong> ${movie.Genre}</li>
                    <li class="list-group-item"><strong>Released:</strong> ${movie.Released}</li>
                    <li class="list-group-item"><strong>Rated:</strong> ${movie.Rated}</li>
                    <li class="list-group-item"><strong>IMDB Rating:</strong> ${movie.imdbRating}</li>
                    <li class="list-group-item"><strong>Director:</strong> ${movie.Director}</li>
                    <li class="list-group-item"><strong>Writer:</strong> ${movie.Writer}</li>
                    <li class="list-group-item"><strong>Actors:</strong> ${movie.Actors}</li>

                </ul>
            </div>
        </div>  
        <div class="row">
            <div class="well">
                <h3>Plot</h3>
                ${movie.Plot}   
                <hr>    
                <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">View IMDB</a>
                <a href="index.html" class="btn btn-default">Go Back To Search</a>
            </div>
        </div>`;
      $("#movie").html(output);
    })

    .catch((error) => {
      console.log(error);
    });
}

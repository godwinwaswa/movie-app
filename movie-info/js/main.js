$(document).ready(() => {
  $('#searchForm').on('submit', (e) => {
    let searchText = $('#searchText').val();
    getMovies(searchText);
    e.preventDefault();
  });
});

function getMovies(searchText) {
  var url = "http://www.omdbapi.com/?s=" + searchText + "&apikey=bb77d20b";
  axios.get(url)
    .then((response) => {
      console.log(response);
      let movies = response.data.Search;
      let output = '';
      $.each(movies, (index, movie) => {
        output += `
      <div class = 'col-md-3'>
        <div class='well text-center'>
        
        
        <img src='${movie.Poster}'>
        <h5>${movie.Title}</h5>
        <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#" >Movie Details</a>
        </div>
      
      
      </div>
      
      
      `;
      });
      $('#movies').html(output);
    })
    .catch((err) => {
      console.log(err);
    });
}

function movieSelected(id) {
  sessionStorage.setItem('movieId', id);
  window.location = 'movie.html';
  return false;
}

function getMovie() {
  let movieId = sessionStorage.getItem('movieId');
  var url = "http://www.omdbapi.com/?i=" + movieId + "&apikey=bb77d20b";
  axios.get(url)
    .then((response) => {
      console.log(response);
      let movie = response.data;

      let output = `
      <div class='row'>
      <div class='col-md-4'>
      <img src="${movie.Poster}" class="thumbnail">
      
      </div>
      <div class='col-md-8'>
      <h5>${movie.Title}</h5>
      <ul class='list-group'>
        <li class='list-group-item'><strong>Genre: </strong>${movie.Genre}</li>
        <li class='list-group-item'><strong>Released: </strong>${movie.Released}</li>
        <li class='list-group-item'><strong>Rated: </strong>${movie.Rated}</li>
        <li class='list-group-item'><strong>IMDB Rating: </strong>${movie.imdbRating}</li>
        <li class='list-group-item'><strong>Director: </strong>${movie.Director}</li>
        <li class='list-group-item'><strong>Actors: </strong>${movie.Actors}</li>
        <li class='list-group-item'><strong>Country: </strong>${movie.Country}</li>
        <li class='list-group-item'><strong>Language: </strong>${movie.Language}</li>
      </ul>
      
      
      </div>
      </div>
      <div class='row'>
       <div class= 'well'>
        <h3>Plot</h3>
        ${movie.Plot}
        <hr>
        <a class='btn btn-primary' href='https:/www.imdb.com/title/${movie.imdbID}' target='_blank' >View IMDB</a>
        <a class='btn btn-default' href='index.html'  >Go back to Search</a>
       </div>
      </div>
      `;
      $('#movie').html(output);
    })
    .catch((err) => {
      console.log(err);
    });
}
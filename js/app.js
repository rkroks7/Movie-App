$(document).ready(() => {
    $('#searchForm').on('submit', (e) => {
        let searchText = $('#searchText').val();
        getMovies(searchText);
        e.preventDefault();
    });
});

function getMovies(searchText) {
    var key = config.API_KEY;
    axios.get('http://www.omdbapi.com/?s=' + searchText + ('&apikey=') + key)
        .then((response) => {
            let movies = response.data.Search;
            let output = '';
            $.each(movies, (index, movie) => {
                console.log(movie.Title)
                output += `
                <div class="col md-3">
                    <div class="well text-center">
                        <img src="${movie.Poster}">
                        <h5>${movie.Title}</h5>
                        <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">Details</a>
                    </div>
                </div>
                `;
            });
            $('#movies').html(output);
        })
        .catch((error) => {
            console.log(error);
        })
}


function movieSelected(id) {
    sessionStorage.setItem('movieId', id);
    window.location = 'movie.html';
    return false;
}

function getMovie() {
    var key = config.API_KEY;
    let movieId = sessionStorage.getItem('movieId');
    axios.get('https://www.omdbapi.com?i=' + movieId + ('&apikey=') + key)
        .then((response) => {
            let movie = response.data;

            let output = `
                <div class="row">
                    <div class="col-md-3">
                        <img src="${movie.Poster}" class="thumbnail">
                    </div>
                    <div class="col-md-8">
                        <h2>${movie.Title}</h2>
                        <ul class="list-group">
                            <li class="list-group-item"><strong>Genre</strong>: ${movie.Genre}</li>
                            <li class="list-group-item"><strong>Type</strong>: ${movie.Type}</li>
                            <li class="list-group-item"><strong>Released</strong>: ${movie.Released}</li>
                            <li class="list-group-item"><strong>IMDB Rating</strong>: ${movie.imdbRating}</li>
                            <li class="list-group-item"><strong>Actors</strong>: ${movie.Actors}</li>
                            <li class="list-group-item"><strong>Directors</strong>: ${movie.Director}</li>
                            <li class="list-group-item"><strong>Total Seasons/Episodes</strong>: ${movie.totalSeasons}</li>
                            <li class="list-group-item"><strong>Awards</strong>: ${movie.Awards}</li>
                            <li class="list-group-item"><strong>Year</strong>: ${movie.Year}</li>

                        </ul>
                    </div>
                </div>
                <div class="row">
                    <div class="well">
                        <h3>Plot</h3>
                        ${movie.Plot}
                        <hr>
                        <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">View IMDB</a>
                        <a href="app.html" class="btn btn-default">Go back to search</a>
                    </div>
                </div>
            `;

            $('#movie').html(output);
        })
        .catch((error) => {
            console.log(error);
        })

}
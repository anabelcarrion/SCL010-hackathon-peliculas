
window.data = {
    path: "http://www.omdbapi.com/?apikey=319b68e3",
    getMoviesByTitle: (tittle) => {
        return fetch(data.path + "&s=" + tittle)
            .then(res => res.json());

    },
    getMoviesByImdbID: (imdbID) => {
        return fetch(data.path + "&i=" + imdbID)
            .then(res => res.json());

    }

}
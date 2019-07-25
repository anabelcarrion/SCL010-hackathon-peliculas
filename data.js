
window.data = {
    path: "http://www.omdbapi.com/?apikey=319b68e3",
    getMoviesByTitle: (tittle,type) => {
        return fetch(data.path + "&s=" + tittle + "&type="+type)
            .then(res => res.json());

    },
    getMoviesByImdbID: (imdbID) => {
        return fetch(data.path + "&i=" + imdbID)
            .then(res => res.json());

    }

}
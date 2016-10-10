var vueApp = new Vue({
    el: '#vueApp',
    data: {
        searchMovie: {
            title: '',
            year: '',
            type: ''
        },
        movieFound: [],
        movies: []
    },
    methods: {
        submitTitle: function() {
            this.movieFound = [];
            this.$http.get('http://www.omdbapi.com/?s=' + this.searchMovie.title + '&y=' + this.searchMovie.year + '&type=' + this.searchMovie.type).then(function(response) {
                var data = response.body.Search;
                for (var movie in data) {
                    this.movieFound.push({
                        id: data[movie].imdbID,
                        title: data[movie].Title,
                        type: data[movie].Type,
                        year: data[movie].Year,
                        poster: data[movie].Poster,
                        unknownPoster: false
                    });
                    if(this.movieFound[movie].poster === "N/A") {
                        this.movieFound[movie].unknownPoster = true;
                    }
                }
            }, function(response) {
                console.log("errors!")
            });
        },
        addMovie: function(event) {
            movieId = event.currentTarget.id;
            this.$http.get('http://www.omdbapi.com/?i=' + movieId).then(function(response) {
                var data = response.body;
                this.movies.push({
                    id: data.imdbID,
                    title: data.Title,
                    actors: data.Actors,
                    awards: data.Awards,
                    country: data.Country,
                    director: data.Director,
                    genre: data.Genre,
                    language: data.Language,
                    metascore: data.Metascore,
                    plot: data.Plot,
                    poster: data.Poster,
                    unknownPoster: false,
                    rated: data.Rated,
                    released: data.Released,
                    runtime: data.Runtime,
                    type: data.Type,
                    writer: data.Writer,
                    year: data.Year,
                    imdbRating: data.imdbRating,
                    imdbVotes: data.imdbVotes
                });
                if(this.movies[this.movies.length - 1].poster === "N/A") {
                    this.movies[this.movies.length - 1].unknownPoster = true;
                }
            });
        }
    }
});
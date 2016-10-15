var vueApp = new Vue({
    el: '#vueApp',
    data: {
        orderOptions: {
            orderBy: 'year',
            orderReverse: 1,
            showYear: true,
            showTitle: false,
            arrowDirection: false
        },
        searchMovie: {
            title: '',
            year: '',
            type: ''
        },
        moviesFound: [],
        movie: {},
        movieSelect: false,
        savedMovies: [],
    },
    methods: {
        submitTitle: function() {
            this.moviesFound = [];
            this.$http.get('http://www.omdbapi.com/?s=' + this.searchMovie.title + '&y=' + this.searchMovie.year + '&type=' + this.searchMovie.type).then(function(response) {
                var data = response.body.Search;
                for (var movie in data) {
                    this.moviesFound.push({
                        id: data[movie].imdbID,
                        title: data[movie].Title,
                        type: data[movie].Type,
                        year: data[movie].Year,
                        poster: data[movie].Poster,
                        unknownPoster: false
                    });
                    if(this.moviesFound[movie].poster === "N/A") {
                        this.moviesFound[movie].unknownPoster = true;
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
                this.movie.push({
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
                if(this.movie[this.movie.length - 1].poster === "N/A") {
                    this.movie[this.movie.length - 1].unknownPoster = true;
                }
            });
        },
        showDetails: function(event) {
            movieId = event.currentTarget.id;
            this.$http.get('http://www.omdbapi.com/?i=' + movieId).then(function(response) {
                var data = response.body;
                this.movie = {
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
                };
                if(this.movie.poster === "N/A") {
                    this.movie.unknownPoster = true;
                }
                this.movieSelect = true;
            });
        },
        changeOrder: function(order) {
            this.orderOptions.orderBy = order;
            this.orderOptions.orderReverse = this.orderOptions.orderReverse * -1;
            if(order === 'year') {
                this.orderOptions.showYear = true;
                this.orderOptions.showTitle = false;
            } else {
                this.orderOptions.showYear = false;
                this.orderOptions.showTitle = true;
            }
            if (this.orderOptions.orderReverse === 1) {
                this.orderOptions.arrowDirection = false;
            } else {
                this.orderOptions.arrowDirection = true;
            }
        },
        saveMovie: function () {
            this.savedMovies.push({
                id: this.movie.id,
                title: this.movie.title,
                actors: this.movie.actors,
                awards: this.movie.awards,
                country: this.movie.country,
                director: this.movie.director,
                genre: this.movie.genre,
                language: this.movie.language,
                metascore: this.movie.metascore,
                plot: this.movie.plot,
                poster: this.movie.poster,
                unknownPoster: this.movie.unknownPoster,
                rated: this.movie.rated,
                released: this.movie.released,
                runtime: this.movie.runtime,
                type: this.movie.type,
                writer: this.movie.writer,
                year: this.movie.year,
                imdbRating: this.movie.imdbRating,
                imdbVotes: this.movie.imdbVotes
            });
            console.log(this.savedMovies);
            this.$http.post('/sendMovie', this.savedMovies).then(function(response) {
                console.log(response.body)
            }, function(response) {
                console.log("errors!")
            });
        }
    }
});
// var vueApp = new Vue({
//     el: '#vueApp',
//     data: {
//         orderOptions: {
//             orderBy: 'year',
//             orderReverse: 1,
//             showYear: true,
//             showTitle: false,
//             arrowDirection: false
//         },
//         searchMovie: {
//             title: '',
//             year: '',
//             type: ''
//         },
//         moviesFound: [],
//         movie: {},
//         movieSelect: false,
//         savedMovies: [],
//     },
//     methods: {
//         submitTitle: function() {
//             this.moviesFound = [];
//             this.$http.get('http://www.omdbapi.com/?s=' + this.searchMovie.title + '&y=' + this.searchMovie.year + '&type=' + this.searchMovie.type).then(function(response) {
//                 var data = response.body.Search;
//                 for (var movie in data) {
//                     this.moviesFound.push({
//                         id: data[movie].imdbID,
//                         title: data[movie].Title,
//                         type: data[movie].Type,
//                         year: data[movie].Year,
//                         poster: data[movie].Poster,
//                         unknownPoster: false
//                     });
//                     if(this.moviesFound[movie].poster === "N/A") {
//                         this.moviesFound[movie].unknownPoster = true;
//                     }
//                 }
//             }, function(response) {
//                 console.log("errors!")
//             });
//         },
//         showDetails: function(event) {
//             movieId = event.currentTarget.id;
//             this.$http.get('http://www.omdbapi.com/?i=' + movieId).then(function(response) {
//                 var data = response.body;
//                 this.movie = {
//                     id: data.imdbID,
//                     title: data.Title,
//                     actors: data.Actors,
//                     awards: data.Awards,
//                     country: data.Country,
//                     director: data.Director,
//                     genre: data.Genre,
//                     language: data.Language,
//                     metascore: data.Metascore,
//                     plot: data.Plot,
//                     poster: data.Poster,
//                     unknownPoster: false,
//                     rated: data.Rated,
//                     released: data.Released,
//                     runtime: data.Runtime,
//                     type: data.Type,
//                     writer: data.Writer,
//                     year: data.Year,
//                     imdbRating: data.imdbRating,
//                     imdbVotes: data.imdbVotes
//                 };
//                 if(this.movie.poster === "N/A") {
//                     this.movie.unknownPoster = true;
//                 }
//                 this.movieSelect = true;
//             });
//         },
//         changeOrder: function(order) {
//             this.orderOptions.orderBy = order;
//             this.orderOptions.orderReverse = this.orderOptions.orderReverse * -1;
//             if(order === 'year') {
//                 this.orderOptions.showYear = true;
//                 this.orderOptions.showTitle = false;
//             } else {
//                 this.orderOptions.showYear = false;
//                 this.orderOptions.showTitle = true;
//             }
//             if (this.orderOptions.orderReverse === 1) {
//                 this.orderOptions.arrowDirection = false;
//             } else {
//                 this.orderOptions.arrowDirection = true;
//             }
//         },
//         saveMovie: function () {
//             this.savedMovies.push({
//                 id: this.movie.id,
//                 title: this.movie.title,
//                 actors: this.movie.actors,
//                 awards: this.movie.awards,
//                 country: this.movie.country,
//                 director: this.movie.director,
//                 genre: this.movie.genre,
//                 language: this.movie.language,
//                 metascore: this.movie.metascore,
//                 plot: this.movie.plot,
//                 poster: this.movie.poster,
//                 unknownPoster: this.movie.unknownPoster,
//                 rated: this.movie.rated,
//                 released: this.movie.released,
//                 runtime: this.movie.runtime,
//                 type: this.movie.type,
//                 writer: this.movie.writer,
//                 year: this.movie.year,
//                 imdbRating: this.movie.imdbRating,
//                 imdbVotes: this.movie.imdbVotes
//             });
//             console.log(this.savedMovies);
//             this.$http.post('/sendMovie', this.savedMovies).then(function(response) {
//                 console.log(response.body)
//
//                 this.$http.get('/getMovie').then(function(response) {
//                     console.log(response.body);
//                     var data = JSON.parse(response.body);
//                     console.log(data);
//                     this.savedMovies = data.savedMovies;
//                 }, function(response) {
//                     console.log("errors!")
//                 });
//
//             }, function(response) {
//                 console.log("errors!")
//             });
//         }
//     }
// });

Vue.use(VueRouter);

var searchMovies = {
    state: {
        movie: [],
        movieDetail: {},
        movieSelect: false,
        savedMovies: [],
        movieId: "initial"
    }
};

var menuComponent = Vue.extend({
    template:   '<nav>' +
                    '<ul>' +
                        '<li><a v-link="{ path: \'/\' }">Database</a></li>' +
                        '<li><a v-link="{ path: \'/library\' }">Your Library</a></li>' +
                    '</ul>' +
                '</nav>'
});

var searchComponent = Vue.extend({
    template:   '<label for="title">Title</label>' +
                '<input value="harry potter" id="title" type="text" placeholder="Type movie title" v-model="searchMovie.title">' +
                '<label for="year" >Year</label>' +
                '<input id="year" type="text" placeholder="Type movie release date" v-model="searchMovie.year">' +
                '<label for="type">Type</label>' +
                '<select id="type" v-model="searchMovie.type">' +
                    '<option value="movie" selected>movie</option>' +
                    '<option value="series">series</option>' +
                    '<option value="episode">episode</option>' +
                    '<option value="game">game</option>' +
                '</select>' +
                '<div class="button">' +
                    '<button v-on:click.prevent="searchTitle">Search</button>' +
                '</div>',
    data: function () {
        return {
            searchMovie: {
                title: '',
                year: '',
                type: ''
            },
            moviesFound: searchMovies.state
        }
    },
    methods: {
        searchTitle: function () {
            this.moviesFound.movie = [];
            this.$http.get('http://www.omdbapi.com/?s=' + this.searchMovie.title + '&y=' + this.searchMovie.year + '&type=' + this.searchMovie.type).then(function (response) {
                var data = response.body.Search;
                for (var movie in data) {
                    this.moviesFound.movie.push({
                        id: data[movie].imdbID,
                        title: data[movie].Title,
                        type: data[movie].Type,
                        year: data[movie].Year,
                        poster: data[movie].Poster,
                        unknownPoster: false
                    });
                    if (this.moviesFound.movie[movie].poster === "N/A") {
                        this.moviesFound.movie[movie].unknownPoster = true;
                    }
                }
            }, function (response) {
                console.log("errors!");
            });
        }
    }
});

var resultOrderComponent = Vue.extend({
    props: ['type', 'direction', 'showYear', 'showTitle', 'show'],
    template:   '<button v-on:click="changeOrder(type)">{{type}} ' +
                    '<i v-show="show == type" v-bind:class="{rotate: direction}" class="fa fa-angle-down" aria-hidden="true"></i>' +
                '</button>',
    methods: {
        changeOrder: function (type) {
            this.$dispatch('changeOrder', type);
        }
    }
});

var resultComponent = Vue.extend({
    template:   '<div class="changeOrder">' +
                    '<div>Order by:</div>' +
                        '<div>' +
                            '<order-year type="year" v-bind:direction="orderOptions.arrowDirection" v-bind:show="orderOptions.show"></order-year>' +
                            '<order-title type="title" v-bind:direction="orderOptions.arrowDirection" v-bind:show="orderOptions.show" v-bind:show-year="orderOptions.showYear" v-bind:show-title="orderOptions.showTitle"></order-title>' +
                        '</div>' +
                    '</div>' +
                    '<div v-for="movies in moviesFound.movie | orderBy orderOptions.orderBy orderOptions.orderReverse" class="result">' +
                        '<div class="moviePoster">' +
                            '<div v-if="movies.unknownPoster">Unknown poster</div>' +
                            '<img v-else v-bind:src="movies.poster" alt="movie poster">' +
                        '</div>' +
                        '<div class="movieInfo">' +
                            '<div class="title"><span>Title:</span> {{movies.title}} ({{movies.year}})</div>' +
                            '<div class="type"><span>Type:</span> {{movies.type}}</div>' +
                            '<div class="button"><button v-on:click.prevent="showDetails($event)" id="{{movies.id}}">Show details</button>' +
                        '</div>' +
                    '</div>' +
                '</div>',
    components: {
        'order-year': resultOrderComponent,
        'order-title': resultOrderComponent
    },
    data: function () {
        return {
            moviesFound: searchMovies.state,
            orderOptions: {
                orderBy: 'year',
                orderReverse: 1,
                showYear: true,
                showTitle: false,
                show: 'year',
                arrowDirection: false
            },
            movieDetail: searchMovies.state,
            movieSelect: searchMovies.state
        }
    },
    events: {
        changeOrder: function (order) {
            this.orderOptions.orderBy = order;
            this.orderOptions.orderReverse = this.orderOptions.orderReverse * -1;
            if (order === 'year') {
                this.orderOptions.show = 'year';
                this.orderOptions.showYear = true;
                this.orderOptions.showTitle = false;
            } else {
                this.orderOptions.show = 'title';
                this.orderOptions.showYear = false;
                this.orderOptions.showTitle = true;
            }
            if (this.orderOptions.orderReverse === 1) {
                this.orderOptions.arrowDirection = false;
            } else {
                this.orderOptions.arrowDirection = true;
            }
        }
    },
    methods: {
        showDetails: function (event) {
            movieId = event.currentTarget.id;
            this.$http.get('http://www.omdbapi.com/?i=' + movieId).then(function (response) {
                var data = response.body;
                this.movieDetail.movieDetail = {
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
                if (this.movieDetail.movieDetail.poster === "N/A") {
                    this.movieDetail.movieDetail.unknownPoster = true;
                }
                this.movieSelect.movieSelect = true;
            });
        }
    }
});

var detailComponent = Vue.extend({
    template:   '<div class="selected" v-if="movieSelect.movieSelect">' +
                    '<div class="moviePoster">' +
                        '<div v-if="movieDetail.movieDetail.unknownPoster">Unknown poster</div>' +
                        '<img v-else v-bind:src="movieDetail.movieDetail.poster" alt="movie poster">' +
                    '</div>' +
                    '<div class="movieInfo">' +
                        '<div><span>Title:</span> {{movieDetail.movieDetail.title}}</div>' +
                        '<div><span>Plot:</span> {{movieDetail.movieDetail.plot}}</div>' +
                        '<div><span>Actors:</span> {{movieDetail.movieDetail.actors}}</div>' +
                        '<div><span>Writer:</span> {{movieDetail.movieDetail.writer}}</div>' +
                        '<div><span>Awards:</span> {{movieDetail.movieDetail.awards}}</div>' +
                        '<div><span>Country:</span> {{movieDetail.movieDetail.country}}</div>' +
                        '<div><span>Director:</span> {{movieDetail.movieDetail.director}}</div>' +
                        '<div><span>Genre:</span> {{movieDetail.movieDetail.genre}}</div>' +
                        '<div><span>Language:</span> {{movieDetail.movieDetail.language}}</div>' +
                        '<div><span>Metascore:</span> {{movieDetail.movieDetail.metascore}}</div>' +
                        '<div><span>Rated:</span> {{movieDetail.movieDetail.rated}}</div>' +
                        '<div><span>Released:</span> {{movieDetail.movieDetail.released}}</div>' +
                        '<div><span>Runtime:</span> {{movieDetail.movieDetail.runtime}}</div>' +
                        '<div><span>IMDB Rating:</span> {{movieDetail.movieDetail.imdbRating}}</div>' +
                        '<div><span>IMDB Votes:</span> {{movieDetail.movieDetail.imdbVotes}}</div>' +
                        '<div><span>Type:</span> {{movieDetail.movieDetail.type}}</div>' +
                    '</div>' +
                    '<input v-on:click.prevent="saveMovie" type="button" value="Save movie">' +
                '</div>',
    data: function () {
        return {
            movieDetail: searchMovies.state,
            movieSelect: searchMovies.state,
            savedMovies: searchMovies.state,
            getMovies: []
        }
    },
    methods: {
        saveMovie: function () {
            this.savedMovies.savedMovies.push({
                id: this.movieDetail.movieDetail.id,
                title: this.movieDetail.movieDetail.title,
                actors: this.movieDetail.movieDetail.actors,
                awards: this.movieDetail.movieDetail.awards,
                country: this.movieDetail.movieDetail.country,
                director: this.movieDetail.movieDetail.director,
                genre: this.movieDetail.movieDetail.genre,
                language: this.movieDetail.movieDetail.language,
                metascore: this.movieDetail.movieDetail.metascore,
                plot: this.movieDetail.movieDetail.plot,
                poster: this.movieDetail.movieDetail.poster,
                unknownPoster: this.movieDetail.movieDetail.unknownPoster,
                rated: this.movieDetail.movieDetail.rated,
                released: this.movieDetail.movieDetail.released,
                runtime: this.movieDetail.movieDetail.runtime,
                type: this.movieDetail.movieDetail.type,
                writer: this.movieDetail.movieDetail.writer,
                year: this.movieDetail.movieDetail.year,
                imdbRating: this.movieDetail.movieDetail.imdbRating,
                imdbVotes: this.movieDetail.movieDetail.imdbVotes
            });
            this.$http.post('/sendMovie', this.savedMovies.savedMovies).then(function (response) {
                console.log(response.body);
            }, function (response) {
                console.log("errors!")
            });
        }
    },
    created: function () {
        this.$http.get('/getMovie').then(function (response) {
            //console.log(response.body);
            var data = JSON.parse(response.body);
            //console.log(data);
            this.savedMovies.savedMovies = data.savedMovies;
        }, function (response) {
            console.log("errors!")
        });
    }
});

var databaseComponent = Vue.extend({
    template:   '<section class="movieDatabase">' +
                    '<article class="searchTitle">' +
                        '<search-component></search-component>' +
                    '</article>' +
                    '<article class="results">' +
                        '<result-component></result-component>' +
                    '</article>' +
                    '<article class="movieSelected">' +
                        '<detail-component></detail-component>' +
                    '</article>' +
                '</section>',
    components: {
        'search-component': searchComponent,
        'result-component': resultComponent,
        'detail-component': detailComponent
    }
});

var libraryListComponent = Vue.extend({
    template:   '<h2>Your movies:</h2>' +
                '<ul>' +
                    '<li v-for="movie in savedMovies.savedMovies">' +
                        '<a v-on:click="showDetails($event)" id="{{movie.id}}">{{movie.title}}</a>' +
                    '</li>' +
                '</ul>',
    data: function () {
        return {
            savedMovies: searchMovies.state,
            showMovie: searchMovies.state
        }
    },
    methods: {
        showDetails: function (event) {
            this.showMovie.movieId = event.currentTarget.id;
        }
    },
    created: function () {
        this.$http.get('/getMovie').then(function (response) {
            //console.log(response.body);
            var data = JSON.parse(response.body);
            //console.log(data);
            this.savedMovies.savedMovies = data.savedMovies;
        }, function (response) {
            console.log("errors!")
        });
    }
});

var libraryDetailComponent = Vue.extend({
    template:   '<div v-for="movieDetail in savedMovies.savedMovies | filterBy showMovie.movieId in \'id\'">' +
                '<div class="moviePoster">' +
                        '<div v-if="movieDetail.unknownPoster">Unknown poster</div>' +
                        '<img v-else v-bind:src="movieDetail.poster" alt="movie poster">' +
                    '</div>' +
                    '<div class="movieInfo">' +
                        '<div><span>Title:</span> {{movieDetail.title}}</div>' +
                        '<div><span>Plot:</span> {{movieDetail.plot}}</div>' +
                        '<div><span>Actors:</span> {{movieDetail.actors}}</div>' +
                        '<div><span>Writer:</span> {{movieDetail.writer}}</div>' +
                        '<div><span>Awards:</span> {{movieDetail.awards}}</div>' +
                        '<div><span>Country:</span> {{movieDetail.country}}</div>' +
                        '<div><span>Director:</span> {{movieDetail.director}}</div>' +
                        '<div><span>Genre:</span> {{movieDetail.genre}}</div>' +
                        '<div><span>Language:</span> {{movieDetail.language}}</div>' +
                        '<div><span>Metascore:</span> {{movieDetail.metascore}}</div>' +
                        '<div><span>Rated:</span> {{movieDetail.rated}}</div>' +
                        '<div><span>Released:</span> {{movieDetail.released}}</div>' +
                        '<div><span>Runtime:</span> {{movieDetail.runtime}}</div>' +
                        '<div><span>IMDB Rating:</span> {{movieDetail.imdbRating}}</div>' +
                        '<div><span>IMDB Votes:</span> {{movieDetail.imdbVotes}}</div>' +
                        '<div><span>Type:</span> {{movieDetail.type}}</div>' +
                    '</div>' +
                '</div>',
    data: function () {
        return {
            savedMovies: searchMovies.state,
            showMovie: searchMovies.state
        }
    }
});

var libraryComponent = Vue.extend({
    template:   '<section class="library">' +
                    '<article class="list-library">' +
                        '<library-list-component></library-list-component>' +
                    '</article>' +
                    '<article class="detail-library">' +
                        '<library-detail-component></library-detail-component>' +
                    '</article>' +
                '</section>',
    components: {
        'library-list-component': libraryListComponent,
        'library-detail-component': libraryDetailComponent
    }
});

// var app = new Vue({
//     "el": "#app",
//     components: {
//         'search-component': searchComponent,
//         'result-component': resultComponent,
//         'detail-component': detailComponent
//     }
// });

var App = {
    components: {
        'menu-component': menuComponent,
        // 'search-component': searchComponent,
        // 'result-component': resultComponent,
        // 'detail-component': detailComponent
    }
};

var router = new VueRouter({
    root: '/'
});

router.map({
    '/': {
        component: databaseComponent
    },
    '/library': {
        component: libraryComponent
    }
})

router.start(App, '#app');
var vueApp = new Vue({
    el: '#vueApp',
    data: {
        title: '',
        movieFound: [],
        movies: [],

    },
    methods: {
        submitTitle: function() {
            this.movieFound = [];
            this.$http.get('http://www.omdbapi.com/?s=' + this.title).then(function(response) {
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
                }
                for (var movie in this.movieFound) {
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
                    rated: data.Rated,
                    released: data.Released,
                    runtime: data.Runtime,
                    type: data.Type,
                    writer: data.Writer,
                    year: data.Year,
                    imdbRating: data.imdbRating,
                    imdbVotes: data.imdbVotes
                });
            });
        }
    }
});


Vue.directive('collapse', {
    bind: function () {
        console.log("pierwsze uruchomienie");
    },
    update: function (test, oldtest) {
        console.log(oldtest + " wow " + test);
    }
});
var vueApp2 = new Vue({
    el: '#vueApp2',
    data: {
        todos: [],
        currTodo: "",
        test: "test"
    },
    computed: {
        uniqueImportance:function(){
            importanceArray = [];
            for (var i = 0; i < this.todos.length; i++) {
                if(importanceArray.indexOf(this.todos[i].importance) === -1){
                    importanceArray.push(this.todos[i].importance);
                }
            }
            return importanceArray;
        }
    },
    methods: {
        addTodo: function(){
            var tempImportance = this.newImportance;
            if(this.newImportance === "" || !this.newImportance) {
                tempImportance = "low"
            }
            this.todos.push({name:this.currTodo,editing:false,complete:false,importance:tempImportance});
            this.currTodo = "";
            this.newImportance = "";
        },
        remove: function(todo) {
            var index = this.todos.indexOf(todo);
            this.todos.splice(index,1);
        },
        edit: function(todo) {
            var index = this.todos.indexOf(todo);
            this.todos[index].editing = true;
        },
        save: function(todo) {
            var index = this.todos.indexOf(todo);
            this.todos[index].editing = false;
        },
        changeCheck: function(todo){
            if(todo.complete){
                todo.complete = false;
            } else {
                todo.complete = true;
            }
        },
        submit: function(){
            this.$http.post('/todos', this.todos).then(function(response) {
                console.log(response.body)
            }, function(response) {
                console.log("errors!")
            });
        }
    },
    // created: function(){
    //     this.$http.get('http://www.omdbapi.com/?t=harry').then(function(response) {
    //         console.log(response.body);
    //         var data = JSON.parse(response.body);
    //     }, function(response) {
    //         console.log("errors!")
    //     });
    // }
});
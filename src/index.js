/**
 * es6 modules and imports
 */

// Loading function

function onReady(callback) {
  let intervalId = window.setInterval(function() {
    if (document.getElementsByTagName('body')[0] !== undefined) {
      window.clearInterval(intervalId);
      callback.call(this);
    }
  }, 1000);
}

function setVisible(selector, visible) {
  document.querySelector('#loading-thing').style.display = visible ? 'block' : 'none';
}

onReady(function() {
  setVisible('.page', true);
  setVisible('#loading', false);
});


//===========================================//


import sayHello from './hello';
sayHello('World');

/**
 * require style imports
 */


const $ = require('jquery');

const {getMovies, addNewMovie, deleteMovie, displayMovies} = require('./api.js');

// console.logs movies
getMovies().then((movies) => {
  console.log('Here are all the movies:');
  movies.forEach(({title, rating, id}) => {
    console.log(`id#${id} - ${title} - rating: ${rating}`);
  });
}).catch((error) => {
  alert('Oh no! Something went wrong.\nCheck the console for details.');
  console.log(error);
});


const makeHtml = (movies) => {
    let html = "";
    movies.forEach((movie) => {
      html += '<div class="tile">';
      html += "<div class='row'><div class='movie-details'>";
      html += "<div>" + movie.title + "</div>";
      html += "<div class='rating'>" + movie.rating + "</div>";
      html += "<div><button>"+"edit"+"</button></div>";
      html += "<div><button>"+"delete"+"</button></div>";
      html += "</div>";
    });
      return html;
};
getMovies().then(data => {
  $("#movie-display").ready().append(makeHtml(data));
});

// Adds new movie on button click

$('#add-movie').click(function(event){
  //prevents the page from refreshing
  event.preventDefault();


   //mmmm...store the value of the text inputs into variables
    let movieTitle = $("#movie-title").val();
    let rating = $("#movie-rating").val();
   // call addMovies, passing in those variables
    addNewMovie(movieTitle, rating);
});

// $("#deleteBtn").on("click", function () {
//   alert("click");
// //  code to send Delete request
//   deleteMovie().then(() => {
//
//   })


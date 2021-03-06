// Select the results div element - this is where we will insert the results returned by the API
const results = document.querySelector("#results");

// select the input box and save it to a variable
const input = document.querySelector("#search-input");

// declare our function to insert movies into the results section
const insertMovies = (data) => {
   // the returned movie data from JSON file is held in an object called Search. Here we drill down and save just the movie data
   const movies = data.Search;

   movies.forEach((movie) => {
      // Loop through each movie and concatenate a string of HTML to display
      const movieString = `
	<div class="card-movie">
    	<div class="image-top">
    		<img src=${movie.Poster}>
    	</div>
    	<div class="content">
			<p>${movie.Year}</p>
			<h5>${movie.Title}</h5>
    	</div>
	</div>
	`;
      // Insert the HTML in the results section (have already selected it in line 2)
      results.insertAdjacentHTML("beforeend", movieString);
   });
};

// This is the OMdB API key
const API_key = "afedf630";

// This is the fetch function to get the data from the omdb movie API
const fetchMovies = (query) => {
   // This is the API url, concatenated with the API key and query term
   const URL = `https://www.omdbapi.com/?s=${query}&apikey=${API_key}`;
   // Send the request
   fetch(URL)
      // This code uses json() method to extract the JSON body from the response and parses the data
      .then((response) => response.json())
      // This code uses the returned data. It runs the insertMovies function using the data as the argument
      .then((data) => {
         insertMovies(data);
      });
};

// Select the form element
const form = document.querySelector("#search-form");

// Add event listener on the form - listen for when the submit button is pushed
form.addEventListener("submit", (event) => {
   // prevent default page reload after pressing submit
   event.preventDefault();
   // clear the previous results
   results.innerHTML = "";
   // Run the fetchMovies function using the value entered in the search box as the argument
   fetchMovies(input.value);
});

// Empty results cards and search box when the clear button is clicked
const clear = document.querySelector("#clear").addEventListener("click", () => {
   results.innerHTML = "";
   input.value = "";
});

const inputGroup = document.querySelector(".input-group");
// Create a media condition that targets viewports at least 500px wide
const mediaQuery = window.matchMedia("( min-width: 500px )");
// When the query is true (Note the `matches` property) make the input group bigger by adding large class
if (mediaQuery.matches) {
   inputGroup.classList.add("input-group-lg");
}

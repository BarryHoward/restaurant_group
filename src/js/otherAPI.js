import $ from "jquery";
import {GMAPS_KEY} from "./keys.js";

// Map Function
// ----------------------------------------

function addMap(){
	var key = GMAPS_KEY;
	var gMapsHTML = `
	<iframe class="google-map" width="300" height="250" frameborder="0" style="border:0" src="https://www.google.com/maps/embed/v1/place?q=place_id:ChIJ-wJ18oMD9YgR-YiYMGQyDC8&key=${key}" allowfullscreen></iframe>
`
	$(".map").html(gMapsHTML);
};


// News Functions
// --------------------------------------------------
function getNews(){
	var data = $.ajax({
		url: "https://json-data.herokuapp.com/restaurant/news/1"
	})
	data.then(populateNews);
}

function populateNews(results){
	var newsHtml =
	`
	<p class="latest-news">Latest News</p>
	<div class="first-line">
		<span class="news-title">${results.title}</span><span class="news-date">${results.date_published}</span>
	</div>
	<p class="news-post">${results.post}</p>
	`
	$(".news").html(newsHtml);
};


// Menu Functions
// -----------------------------------------------------
function getMenu(){
	var data = $.ajax({
		url: "https://json-data.herokuapp.com/restaurant/menu/1"
	})
	data.then(populateMenu);
}

function populateMenu(results){
	var keys = Object.keys(results)
	// console.log(keys)
	for (var j=0; j<3; j++){
		var curKey = keys[j];
		$(".menu").append(`<div id="${curKey}"}><p>${curKey}</p></div>`);
		for (var i = 0; i < 4; i++){
			var menuHtml =
			`	<div>
				<span>${results[curKey][i].item}</span>
				<span>${results[curKey][i].price}</span>
				<p>${results[curKey][i].description}</p>
				</div>
			`
			$(`#${curKey}`).append(menuHtml);
		}
	}
};

// all this fancy code that Barry taught me :D

export {addMap, getNews, getMenu};

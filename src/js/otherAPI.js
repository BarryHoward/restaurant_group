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
	var menuData = $.ajax({
		url: "https://json-data.herokuapp.com/restaurant/menu/1"
	})
	menuData.then(populateMenu);
	menuData.then(getSpecial);

}

function populateMenu(results){
	var keys = Object.keys(results)

	for (var j=0; j<3; j++){
		var curKey = keys[j];
		$(".menu").append(`<div class="course-box" id="${curKey}"}><p>${curKey}</p></div>`);
		for (var i = 0; i < 4; i++){
			var menuHtml =
			`	<div class="menu-item" id="${curKey}${i}">
					<span>${results[curKey][i].item}</span>
					<span>${results[curKey][i].price}</span>
					<p>${results[curKey][i].description}</p>
				</div>
			`
			$(`#${curKey}`).append(menuHtml);
			var iconsHtml = `<div class="menu-icon-container">` +
				makeIconInfo("fa-exclamation", "allergies", results[curKey][i].allergies) +
				makeIconInfo("fa-star-o", "favorite", results[curKey][i].favorite) +
				makeIconInfo("fa-fire-extinguisher", "spicy", results[curKey][i].spicy) +
				makeIconInfo("fa-vine", "vegan", results[curKey][i].vegan) + "<div";
			$(`#${curKey}${i}`).append(iconsHtml);
		}
	}
};

function makeIconInfo(iconName, foodParam, value){
	if (foodParam === "allergies"){

		var titleHTML = "<span>Allergy Info</span>";
		if (value===1){
			var descriptionHTML = "<p>This food has killed people</p>";
		} else {
			var descriptionHTML = "<p>Safe for consumption by landlubbers</p>"
		}
		var innerHTML = titleHTML + descriptionHTML;
	} else if (foodParam === "favorite"){

		var titleHTML = "<span>Favorite Info</span>";
		if (value===1){
			var descriptionHTML = "<p>Tales have been spread of this dish's deliciousness.</p>";
		} else {
			var descriptionHTML = "<p>Nobody likes this dish, but who says you aren't special?</p>"
		}
		var innerHTML = titleHTML + descriptionHTML;

	} else if (foodParam === "spicy"){

		var titleHTML = "<span>Spicy Info</span>";
		if (value===1){
			var descriptionHTML = "<p>Might want to wash this down with seawater</p>";
		} else {
			var descriptionHTML = "<p>Mild food for mild men</p>"
		}
		var innerHTML = titleHTML + descriptionHTML;

	} else if (foodParam === "vegan"){
		var titleHTML = "<span>Vegan Info</span>";
		if (value===1){
			var descriptionHTML = "<p>Mostly composed of Kelp</p>";
		} else {
			var descriptionHTML = "<p>Contains meat, milk, egg, or food of some sort</p>"
		}
		var innerHTML = titleHTML + descriptionHTML;
	}
	var iconHTML = `
	<i class="fa ${iconName}" aria-hidden="true">
	<div class="icon-info-box">
		${innerHTML}
	</div></i>
	`;
	return iconHTML;
}

// all this fancy code that Barry taught me :D

// Specials Code
// -------------------------------------------------------

function getSpecial(menuResults){
	var specialData = $.ajax({
		url: "https://json-data.herokuapp.com/restaurant/special/1"
	});
	specialData.then(function(specialResults){
		var keyList = Object.keys(menuResults);
		for (var i=0; i<keyList.length; i++){
			var curKey = keyList[i];
			for(var j=0; j<menuResults[curKey].length; j++){
				if (menuResults[curKey][j].id === specialResults.menu_item_id){
					var specialItem = menuResults[curKey][j];
				}
			}
		}
		populateSpecial(specialItem);
	});
}

function populateSpecial(specialItem){
	var HTML = `
	<p class="special-title">Today's Special</p>
	<div class="special-image"></div>
	<div>
		<span>${specialItem.item}</span>
		<span>${specialItem.price}</span>
		<p>${specialItem.description}</p>
	</div>
	`
	$(".special").html(HTML);

}

export {addMap, getNews, getMenu};

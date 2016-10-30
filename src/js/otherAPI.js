import $ from "jquery";
import {GMAPS_KEY} from "./keys.js";
import {getFlickr} from "./flickr.js"

// Map Function
// ----------------------------------------

function addMap(){
	var key = GMAPS_KEY;
	var titleHTML = `<p class="map-title three-box-title">Our Location</p>`;
	var gMapsHTML = `
	<iframe class="google-map" src="https://www.google.com/maps/embed/v1/place?q=place_id:ChIJEWSIMvT92IgRSeV6GRY6Xtw&key=${key}" allowfullscreen></iframe>
	`;
	var addressHTML = `<div class="map-address">
						<p>1 Commercial Blvd</p>
						<p>Lauderdale-By-The-Sea, FL 33308</p>
						<form action="https://www.google.com/maps/dir//Aruba+Beach+Cafe,+1+Commercial+Blvd,+Lauderdale-By-The-Sea,+FL+33308/@26.1899668,-80.0973211,17z/data=!4m16!1m7!3m6!1s0x88d8fdf432886411:0xdc5e3a16197ae549!2sAruba+Beach+Cafe!3b1!8m2!3d26.189962!4d-80.095127!4m7!1m0!1m5!1m1!1s0x88d8fdf432886411:0xdc5e3a16197ae549!2m2!1d-80.095127!2d26.189962">
							<button>Directions</button>
						</form>
						</div>`
	$(".map").html(titleHTML+gMapsHTML+addressHTML);
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
	<p class="latest-news three-box-title">Latest News</p>
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
		$(".menu").append(`<div class="course-box" id="${curKey}"}><p class="course-type">${curKey}</p></div>`);
		var courseCount = [3, 4, 2];
		for (var i = 0; i < courseCount[j]; i++){
			var menuHtml =
			`	<div class="menu-item" id="${curKey}${i}">
					<div class="item-top-line">
						<span class="item-title">${results[curKey][i].item}</span>
						<span class="price">${results[curKey][i].price}</span>
					</div>
					<div class="item-bottom-container" id="${curKey}${i}-lower">
						<p class="item-description">${results[curKey][i].description}</p>
					</div>
				</div>
			`
			$(`#${curKey}`).append(menuHtml);
			var iconsHtml = `<div class="menu-icon-container">` +
				makeIconInfo("fa-exclamation", "allergies", results[curKey][i].allergies) +
				makeIconInfo("fa-star", "favorite", results[curKey][i].favorite) +
				makeIconInfo("fa-fire-extinguisher", "spicy", results[curKey][i].spicy) +
				makeIconInfo("fa-envira", "vegan", results[curKey][i].vegan) + "<div";
			$(`#${curKey}${i}-lower`).append(iconsHtml);
		}
	}
};

function makeIconInfo(iconName, foodParam, value){
	var colorClass = "";
	if (foodParam === "allergies"){
		if (value===1){
			var titleHTML = "<span>Contains Common Allergens</span>";
			var descriptionHTML = "<p>This food has killed people.</p>";
			colorClass = " black";
		} else {
			var titleHTML = "<span>No major allergens</span>";
			var descriptionHTML = "<p>Safe for consumption by landlubbers.</p>"
		}
		var innerHTML = titleHTML + descriptionHTML;
	} else if (foodParam === "favorite"){
		if (value===1){
			var titleHTML = "<span>Local Favorite</span>";
			var descriptionHTML = "<p>Tales have been spread of this dish's deliciousness.</p>";
			colorClass = " orange";
		} else {
			var titleHTML = "<span>Not a favorite</span>";
			var descriptionHTML = "<p>Nobody likes this dish, but who says you aren't special?</p>"
		}
		var innerHTML = titleHTML + descriptionHTML;
	} else if (foodParam === "spicy"){
		if (value===1){
			var titleHTML = "<span>Spicy Dish</span>";
			var descriptionHTML = "<p>Might want to wash this down with seawater.</p>";
			colorClass = " red";
		} else {
			var titleHTML = "<span>Mild dish</span>";
			var descriptionHTML = "<p>Mild food for mild men.</p>"
		}
		var innerHTML = titleHTML + descriptionHTML;
	} else if (foodParam === "vegan"){
		if (value===1){
			var titleHTML = "<span>Vegan Dish</span>";
			var descriptionHTML = "<p>Mostly composed of Kelp.</p>";
			colorClass = " green";
		} else {
			var titleHTML = "<span>Normal food</span>";
			var descriptionHTML = "<p>Contains meat, milk, egg, or food of some sort.</p>"
		}
		var innerHTML = titleHTML + descriptionHTML;
	}
	var iconHTML = `
	<i class="fa ${iconName}${colorClass} menu-icon" aria-hidden="true">
		<div class="icon-info-box ${colorClass}info">
			${innerHTML}
		</div>
	</i>
	`;
	return iconHTML;
}


// Reservations Code
//---------------------------------------------------------

function populateReservations(){
	var reservationsHtml =
		`
		<div class = "reserve">
			<div class = "customerName">
				<p class = "info">Full Name</p>
				<input class = "customerInfo" type = "text">
			</div>
			<div class = "guestNumber">
				<p class = "info">Number of Guests</p>
				<input class = "customerInfo" type = "text">
			</div>
			<div class = "guestDate">
				<p class = "info">Date</p>
				<input class = "customerInfo" type = "text">
			</div>
			<div class = "comments">
				<p class = "info">Special Notes</p>
				<textarea class = "customerInfo"></textarea>
			</div>
			<div class = "seating">
				<p class = "info">Seating Preference</p>
				<select>
					<option>Indoor</option>
					<option>Outdoor</option>
				</select>
			</div>
			<div class = "submit">
				<button>Reserve Table</button>
			</div>
		</div>
		`
		$(".reservations").html(reservationsHtml);
};


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
		getFlickr(5483708730, ".special-image");
	});
}

function populateSpecial(specialItem){
	var HTML = `
	<p class="special-title three-box-title">Today's Special</p>
	<div class="special-image"></div>
	<div class = "first-line">
		<div class = "sp-menu-item">${specialItem.item}</div>
		<div class = "sp-menu-price">${specialItem.price}</div>
	</div>
	<p>${specialItem.description}</p>
	`
	$(".special").html(HTML);

}

export {addMap, getNews, getMenu, populateReservations};

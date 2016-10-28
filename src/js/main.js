import {getNews, addMap, getMenu} from "./otherAPI.js";
import {getFlickr} from "./flickr.js"

import $ from "jquery";

getNews();

addMap();

getMenu();

$(".tab-button").click(openTab);

var currentOpen = ".story";
function openTab(event){
	var target = event.target;
	var buttonValue = $(target).attr('id').split("-")[0];
	if (buttonValue !== currentOpen){
		$(currentOpen).toggleClass("invisible");
		$(`.${buttonValue}`).toggleClass("invisible");
		currentOpen = `.${buttonValue}`;
	}
}

getFlickr(8012453328, ".photo");
getFlickr(5483708730, ".special-image");
getFlickr(8619961752, ".foodPhotos");
getFlickr(1863297923, ".foodPhotos");
getFlickr(15100116960, ".foodPhotos");
getFlickr(15160949480, ".foodPhotos");
getFlickr(3360793849, ".foodPhotos");

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
			<input class="button" value="Reserve Table">
			</div>
		</div>
		`
		$(".reservations").html(reservationsHtml);
};

populateReservations();

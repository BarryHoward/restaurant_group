import {getNews, addMap, getMenu, populateReservations} from "./otherAPI.js";
import {getFlickr} from "./flickr.js"

import $ from "jquery";

//Populate Boxes

getNews();
addMap();
getMenu();
populateReservations();

//Place pictures

getFlickr(8012453328, ".photo");

getFlickr(8619961752, ".foodPhotos");
getFlickr(1863297923, ".foodPhotos");
getFlickr(15100116960, ".foodPhotos");
getFlickr(15160949480, ".foodPhotos");
getFlickr(3360793849, ".foodPhotos");

//Click Event for tabs

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
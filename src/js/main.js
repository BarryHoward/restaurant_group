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

getFlickr(8619961752, "#food-box-1");
getFlickr(1863297923, "#food-box-2");
getFlickr(15100116960, "#food-box-3");
getFlickr(15160949480, "#food-box-4");
getFlickr(3360793849, "#food-box-5");

//Click Event for tabs

$(".tab-button").click(openTab);

var currentOpen = ".story";
var currentTab = "#story-button";
function openTab(event){
	var target = event.target;
	$(target).toggleClass("chosen-tab");
	$(`${currentTab}`).toggleClass("chosen-tab");
	currentTab = '#' + $(target).attr('id');
	var buttonValue = $(target).attr('id').split("-")[0];
	if (buttonValue !== currentOpen){
		$(currentOpen).toggleClass("invisible");
		$(`.${buttonValue}`).toggleClass("invisible");
		currentOpen = `.${buttonValue}`;
	}
}
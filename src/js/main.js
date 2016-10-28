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


getFlickr(16207267976, ".photo");
getFlickr(30574698245, ".foodPhotos");
getFlickr(30574698245, ".foodPhotos");
getFlickr(30574698245, ".foodPhotos");

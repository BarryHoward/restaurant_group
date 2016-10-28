import {getNews, addMap, getMenu} from "./otherAPI.js";
import {getFlickr} from "./flickr.js"

import $ from "jquery";

getNews();

addMap();

getMenu();

$(".tab-button").click(openTab);

function openTab(event){
	var target = event.target;
	var buttonValue = $(target).attr('id').split("-")[0];
	console.log(`.${buttonValue}`)
	$(`.${buttonValue}`).toggleClass("invisible");
}


getFlickr(16207267976, ".photo");
getFlickr(30574698245, ".foodPhotos");
getFlickr(30574698245, ".foodPhotos");
getFlickr(30574698245, ".foodPhotos");

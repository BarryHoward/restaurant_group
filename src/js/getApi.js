import $ from "jquery"
import {FLICKR_KEY} from "./keys.js"


function getNews(){
	var data = $.ajax({
		url: "https://json-data.herokuapp.com/restaurant/news/1"
	})
	return data;
}

function getFlickr(){
	var base = "https://api.flickr.com/services/rest/";
	var method = "flickr.photos.getInfo"
	var photoID = 2177060015;

	// console.log(urlString);

	var data = $.ajax({
		url: "https://api.flickr.com/services/rest/",
		data: {
			method: method,
			api_key: FLICKR_KEY,
			photo_id: photoID,
			format: "json"
		}
	})
	return data;
}

export {getNews, getFlickr};
import $ from "jquery"
import {FLICKR_KEY} from "./keys.js"
import {generateFlickr} from "./generate.js"


function getNews(){
	var data = $.ajax({
		url: "https://json-data.herokuapp.com/restaurant/news/1"
	})
	return data;
}

function getFlickr(photoId, containerString){
	var base = "https://api.flickr.com/services/rest/";
	var method= "flickr.photos.getInfo"

	var data = $.ajax({
		url: "https://api.flickr.com/services/rest/",
		data: {
			method: method,
			api_key: FLICKR_KEY,
			photo_id: photoId,
			format: "json"
		}
	})

	data.then(function(result){
		generateFlickr(result, containerString);
	});
}

export {getNews, getFlickr};
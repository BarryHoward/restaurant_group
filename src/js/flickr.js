import $ from "jquery";
import {FLICKR_KEY} from "./keys.js"


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

function generateFlickr(result, containerString){
	var properResult = JSON.parse(result.slice(14, result.length-1));
	var photo = properResult.photo;
	var photoURL = 'http://farm' + photo.farm + '.static.flickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '_m.jpg';
	$(containerString).append(`<img src=${photoURL}>`);

}

export {getFlickr};
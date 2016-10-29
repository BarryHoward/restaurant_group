import $ from "jquery";
import {FLICKR_KEY} from "./keys.js"


function getFlickr(photoId, containerString){
	var base = "https://api.flickr.com/services/rest/";
	var method= "flickr.photos.getInfo";
	var method2 = "flickr.photos.getSizes";

	var data = $.ajax({
		url: "https://api.flickr.com/services/rest/",
		data: {
			method: method2,
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
	var photo = properResult.sizes.size[properResult.sizes.size.length-1];
	var photoURL = photo.source;
	var photoHTML = `<img src=${photoURL}>`;
	$(containerString).append(photoHTML);

}

export {getFlickr};
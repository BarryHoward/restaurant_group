import $ from "jquery";

function addMap(key){
	var gMapsHTML = `
	<iframe class="google-map" width="300" height="250" frameborder="0" style="border:0" src="https://www.google.com/maps/embed/v1/place?q=place_id:ChIJ-wJ18oMD9YgR-YiYMGQyDC8&key=${key}" allowfullscreen></iframe>
`
	$(".map").html(gMapsHTML);
}

function populateNews(results){
	var newsHtml =
	`
	<p class="latest-news">Latest News</p>
	<div class="first line">
		<span class="news-title">${results.title}</span><span class="news-date">${results.date_published}</span>
	</div>
	<p class="news-post">${results.post}</p>
	`
	$(".news").html(newsHtml);
};

function generateFlickr(result){
	console.log(result);
}

export {addMap, populateNews, generateFlickr};

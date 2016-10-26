import {getNews} from "./getApi.js";
import $ from "jquery";

var data = getNews();

data.then(populateNews);

function populateNews(results){
	var newsHtml = 
	`
	<span class="news-title">${results.title}</span><span class="news-date">${results.date_published}</span>
	<p class="news-post">${results.post}</p>
	`
	$(".news").html(newsHtml);
};
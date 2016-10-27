import {getNews, getFlickr} from "./getApi.js";
import {addMap, populateNews} from "./generate.js";
import {GMAPS_KEY} from "./keys.js";
import $ from "jquery";

var data = getNews();

data.then(populateNews);


addMap(GMAPS_KEY);

getFlickr(30574698245, ".foodPhotos");
getFlickr(30574698245, ".foodPhotos");
getFlickr(30574698245, ".foodPhotos");

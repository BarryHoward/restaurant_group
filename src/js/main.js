import {getNews, getFlickr} from "./getApi.js";
import {addMap, populateNews, generateFlickr} from "./generate.js";
import {GMAPS_KEY} from "./keys.js";
import $ from "jquery";

var data = getNews();

data.then(populateNews);


addMap(GMAPS_KEY);

var flickr_data =  getFlickr();
console.log(flickr_data);
flickr_data.then(generateFlickr);
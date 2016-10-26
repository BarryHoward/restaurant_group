import {getNews} from "./getApi.js";
import $ from "jquery";
import {GMAPS_KEY} from "./keys.js"
import {addMap, populateNews} from "./generate.js";

var data = getNews();

data.then(populateNews);

addMap(GMAPS_KEY);

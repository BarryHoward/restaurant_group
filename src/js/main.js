import {getNews} from "./getApi.js";
import {addMap, populateNews} from "./generate.js";
import {GMAPS_KEY} from "./keys.js";
import $ from "jquery";
import {GMAPS_KEY} from "./keys.js"
import {addMap, populateNews} from "./generate.js";

var data = getNews();

data.then(populateNews);

<<<<<<< HEAD
addMap(GMAPS_KEY);
=======
>>>>>>> fcff60944a4349a179284c8601374cead18f91f4

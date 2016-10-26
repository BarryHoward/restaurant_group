import $ from "jquery"


function getNews(){
	var data = $.ajax({
		url: "https://json-data.herokuapp.com/restaurant/news/1"
	})
	return data;
}

export {getNews};

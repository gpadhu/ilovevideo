var Mustache = require('mustache');
var offset = 0;

 	var loadVideo = function(videoSources) {
	 	var template = document.getElementById('template').innerHTML;
	 	Mustache.parse(template);

	 	for(var i=0; i<videoSources.length; i++){
	 		var rendered = Mustache.render(template, videoSources[i] );
		  var videoElement = document.createElement('div');
		  videoElement.className = 'video';
		  videoElement.innerHTML = rendered;
		  document.getElementById('main-container').appendChild(videoElement);
	 	}
	};

var loadJSON = function(offset=0) {
	var xhr = new XMLHttpRequest();
	xhr.overrideMimeType('application/json');
	xhr.open('GET', './data.json');
	xhr.onreadystatechange = function() {
		if(xhr.readyState ==4 && xhr.status == 200 ){
			var allSource = JSON.parse(xhr.responseText).videos
			if(allSource.length > offset){
				var videoSources = allSource.slice(offset, offset+10);
				loadVideo(videoSources);	
			}
		}
	}
	xhr.send();
};



var loadNext = function() {
	var footer = document.getElementById('footer');
	var yOffset = window.pageYOffset;
	var y = yOffset + window.innerHeight;
	
	if (y >= footer.offsetTop) {
		offset+=10;
		loadJSON(offset);
	}
};
document.load = loadJSON();

document.addEventListener('scroll', loadNext);

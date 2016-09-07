

var autoPlay = function() {
	var videos = document.getElementsByTagName('video');
	for(var i=0; i<videos.length; i++){
		var videoTopPosition = videos[i].getBoundingClientRect().top;
		var videoBottomPosition = videos[i].getBoundingClientRect().bottom;
		if ( videoTopPosition > 50 && videoBottomPosition < window.innerHeight ){
			videos[i].play();
			break;
		}else{
			videos[i].pause();
		}
	}
};


document.addEventListener('scroll', autoPlay);

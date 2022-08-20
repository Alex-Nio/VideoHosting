// Убиваем активный видео-файл
function removeVideo() {
	let videoParent = document.querySelectorAll(".video-content"),
		videoWrapper = document.querySelectorAll(".video-content-wrapper");

	videoParent.forEach((el) => {
		el.remove();
	});

	videoWrapper.forEach((el) => {
		el.remove();
	});
}

module.exports = removeVideo;

// Видео мейкер
function videoCreator(target, Folder, VideoFile, subFolderName, subFoldersCount, subSubFolderName) {
	let videoParent = document.createElement("div"),
		videoWrapper = document.createElement("div");

	videoParent.classList.add("video-content");
	videoWrapper.classList.add("video-content-wrapper");

	if (subFoldersCount <= 1) {
		if (subFolderName.nodeValue == "\n\t\t\t\t") {
			console.log("No subfolders");

			videoWrapper.innerHTML = `
				<video id="my-video" class="video-js" controls preload="auto" width="640" height="264" poster="" data-setup="{}">
					<source src="../data/Курсы/${Folder}/${VideoFile}" type="video/mp4" />
					<p class="vjs-no-js">
						To view this video please enable JavaScript, and consider upgrading to a
						web browser that
						<a href="https://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a>
					</p>
				</video>
			`;
		} else {
			console.log("Subfolders here");

			subFolderName = subFolderName.innerText;

			videoWrapper.innerHTML = `
				<video id="my-video" class="video-js" controls preload="auto" width="640" height="264" poster="" data-setup="{}">
					<source src="../data/Курсы/${Folder}/${subFolderName}/${VideoFile}" type="video/mp4" />
					<p class="vjs-no-js">
						To view this video please enable JavaScript, and consider upgrading to a
						web browser that
						<a href="https://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a>
					</p>
				</video>
			`;
		}
	} else if (subFoldersCount >= 2) {
		if (subSubFolderName != undefined) {
			subFolderName = subFolderName.textContent;
			videoWrapper.innerHTML = `
				<video id="my-video" class="video-js" controls preload="auto" width="640" height="264" poster="" data-setup="{}">
					<source src="../data/Курсы/${Folder}/${subSubFolderName}/${subFolderName}/${VideoFile}" type="video/mp4" />
					<p class="vjs-no-js">
						To view this video please enable JavaScript, and consider upgrading to a
						web browser that
						<a href="https://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a>
					</p>
				</video>
			`;
		}
	}

	videoParent.append(videoWrapper);
	target.parentNode.append(videoParent);
}

module.exports = videoCreator;

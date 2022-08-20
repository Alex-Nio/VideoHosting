function createIcons() {
	let allFiles = document.querySelectorAll(".link__box");

	allFiles.forEach((file) => {
		let fileType = file.innerText,
			videoIcon = document.createElement("span"),
			folderIcon = document.createElement("span"),
			fileIcon = document.createElement("span");

		videoIcon.classList.add("video-icon");
		folderIcon.classList.add("folder-icon");
		fileIcon.classList.add("file-icon");

		if (
			fileType.substr(-3) == ".py" ||
			fileType.substr(-3) == ".gz" ||
			fileType.substr(-3) == ".js" ||
			fileType.substr(-4) == ".pdf" ||
			fileType.substr(-4) == ".txt" ||
			fileType.substr(-4) == ".rtf" ||
			fileType.substr(-4) == ".pkt" ||
			fileType.substr(-4) == ".svg" ||
			fileType.substr(-4) == ".sfk" ||
			fileType.substr(-4) == ".apk" ||
			fileType.substr(-4) == ".jar" ||
			fileType.substr(-4) == ".yml" ||
			fileType.substr(-4) == ".css" ||
			fileType.substr(-4) == ".csv" ||
			fileType.substr(-4) == ".gif" ||
			fileType.substr(-4) == ".TTF" ||
			fileType.substr(-4) == ".zip" ||
			fileType.substr(-4) == ".key" ||
			fileType.substr(-4) == ".ico" ||
			fileType.substr(-4) == ".png" ||
			fileType.substr(-4) == ".srt" ||
			fileType.substr(-4) == ".jpg" ||
			fileType.substr(-4) == ".url" ||
			fileType.substr(-5) == ".html" ||
			fileType.substr(-5) == ".webm" ||
			fileType.substr(-5) == ".xlsx" ||
			fileType.substr(-5) == ".json" ||
			fileType.substr(-5) == ".docx" ||
			fileType.substr(-5) == ".pptx" ||
			fileType.substr(-6) == ".cache" ||
			fileType.substr(-10) == "Dockerfile" ||
			fileType.substr(-13) == ".unitypackage"
		) {
			// console.log("Это какой-то файл");
			file.prepend(fileIcon);
		} else if (fileType.substr(-4) == ".mp4") {
			// console.log("Это Видео файл");
			file.prepend(videoIcon);
		} else {
			// console.log("Это Папка");
			file.prepend(folderIcon);
		}
	});
}

module.exports = createIcons;
